import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CircularProgressBar from '../../src/elements/CircularProgressBar';

describe('CircularProgressBar', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<CircularProgressBar />);
    const circularProgressBar = getByTestId('circular-progress');
    expect(circularProgressBar).toBeInTheDocument();
  });

  it('renders the canvas element', () => {
    const { getByTestId } = render(<CircularProgressBar />);
    const canvasElement = getByTestId('canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  it('renders the refresh icon container', () => {
    const { getByTestId } = render(<CircularProgressBar />);
    const refreshIconContainer = getByTestId('refresh-icon-container');
    expect(refreshIconContainer).toBeInTheDocument();
  });

  it('renders the refresh icon', () => {
    const { getByTestId } = render(<CircularProgressBar />);
    const refreshIcon = getByTestId('refresh-icon');
    expect(refreshIcon).toBeInTheDocument();
  });

  it('applies the correct size prop to the circular progress bar', () => {
    const size = 200;
    const { getByTestId } = render(<CircularProgressBar size={size} />);
    const circularProgressBar = getByTestId('circular-progress');
    expect(circularProgressBar).toHaveStyle(`width: ${size}px`);
    expect(circularProgressBar).toHaveStyle(`height: ${size}px`);
  });

  it('calls onRefreshClick function when refresh icon is clicked and wait mode is disabled', () => {
    const onRefreshClick = jest.fn();
    const { getByTestId } = render(<CircularProgressBar onRefreshClick={onRefreshClick} />);
    const refreshIcon = getByTestId('refresh-icon');
    fireEvent.click(refreshIcon);
    expect(onRefreshClick).toHaveBeenCalled();
  });

  it('does not call onRefreshClick function when refresh icon is clicked and wait mode is enabled', () => {
    const onRefreshClick = jest.fn();
    const { getByTestId } = render(<CircularProgressBar onRefreshClick={onRefreshClick} enableWaitMode />);
    const refreshIcon = getByTestId('refresh-icon');
    fireEvent.click(refreshIcon);
    expect(onRefreshClick).not.toHaveBeenCalled();
  });

  it('disables refresh icon when wait mode is enabled', () => {
    const { getByTestId } = render(<CircularProgressBar enableWaitMode />);
    const refreshIcon = getByTestId('refresh-icon');
    expect(refreshIcon).toHaveAttribute('disabled');
  });

  it('does not disable refresh icon when wait mode is disabled', () => {
    const { getByTestId } = render(<CircularProgressBar />);
    const refreshIcon = getByTestId('refresh-icon');
    expect(refreshIcon).not.toHaveAttribute('disabled');
  });
});
