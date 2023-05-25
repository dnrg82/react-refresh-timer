import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RefreshTimer from '../src/index';
import { act } from 'react-dom/test-utils';

describe('RefreshTimer', () => {
  
    jest.useFakeTimers();

    it('renders without crashing', () => {
        const { getByTestId } = render(<RefreshTimer />);
        const refreshTimer = getByTestId('refresh-timer');
        expect(refreshTimer).toBeInTheDocument();
    });

    it('increments progress bar by step at interval', () => {
        const onRefresh = jest.fn();
        const step = 5;
        const interval = 1000;
        const { getByTestId } = render(
          <RefreshTimer
            onRefresh={onRefresh}
            step={step}
            interval={interval}
          />
        );
        const progressBar = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]');
    
        // Initial value is 0
        expect(progressBar).toHaveAttribute('data-progress', '0');
    
        // Wait for the first interval to complete
        act(() => {
          jest.advanceTimersByTime(interval);
        });
    
        // Value should now be step
        expect(progressBar).toHaveAttribute('data-progress', String(step));
    
        // Wait for another interval
        act(() => {
          jest.advanceTimersByTime(interval);
        });
    
        // Value should now be 2 * step
        expect(progressBar).toHaveAttribute('data-progress', String(2 * step));
      });

    it('triggers onRefresh when progress bar reaches 100%', () => {
        const onRefresh = jest.fn();
        const step = 5;
        const interval = 1000;
        const { getByTestId } = render(<RefreshTimer onRefresh={onRefresh} step={step} interval={interval} />);
        const progressBar = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]');

        // Initial value is 0
        expect(progressBar).toHaveAttribute('data-progress', '0');

        // Advance timers until progress bar reaches 100%
        act(() => {
            jest.advanceTimersByTime(19 * interval);
        });

        // Value should now be 95
        expect(progressBar).toHaveAttribute('data-progress', '95');
        
        // Advance timers until progress bar reaches 100%
        act(() => {
            jest.advanceTimersByTime(interval);
        });
        
        expect(onRefresh).toHaveBeenCalled();
    });

      
      

    it('disables progress bar and refresh icon during wait time', async () => {
        const refreshTimeOut = 3000;
        const onRefreshClick = jest.fn();
        
        const { getByTestId } = render(
            <RefreshTimer refreshTimeOut={refreshTimeOut} onRefresh={onRefreshClick} />
        );

        const refreshTimer = getByTestId('refresh-timer');
        const progressBar = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]');
        const refreshIcon = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]').querySelector('[data-testid="refresh-icon"]');
        fireEvent.click(refreshIcon);
        expect(progressBar).toHaveAttribute('data-enablewaitmode', 'true');
        expect(refreshIcon).toHaveAttribute('disabled');

    });

    it('resets progress bar to 0 after wait time', async () => {
        const refreshTimeOut = 3000;
        const { getByTestId } = render(
          <RefreshTimer refreshTimeOut={refreshTimeOut} />
        );
        const progressBar = getByTestId('circular-progress');
        fireEvent.click(progressBar);
        await waitFor(() => {
          expect(progressBar).toHaveAttribute('data-progress', '0');

        }, { timeout: refreshTimeOut });
    });

    it('applies the correct styling props', () => {
        const size = 200;
        const strokeWidth = 10;
        const circleColor = 'red';
        const progressColor = 'green';
        const { getByTestId } = render(
          <RefreshTimer
            size={size}
            strokeWidth={strokeWidth}
            circleColor={circleColor}
            progressColor={progressColor}
          />
        );
        const refreshTimer = getByTestId('refresh-timer');
        const progressBar = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]');
        const canvas = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]').querySelector('canvas');
        const refreshIcon = getByTestId('refresh-timer').querySelector('[data-testid="circular-progress"]').querySelector('[data-testid="refresh-icon"]');

        expect(progressBar).toHaveStyle(`width: ${size}px`);
        expect(progressBar).toHaveStyle(`height: ${size}px`);
    
        expect(canvas).toHaveStyle(`width: ${size}`);
        expect(canvas).toHaveStyle(`height: ${size}`);
    
        expect(refreshIcon).toHaveStyle(`width: ${size}`);
        expect(refreshIcon).toHaveStyle(`height: ${size}`);
      });
});