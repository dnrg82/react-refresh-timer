import { render, fireEvent } from '@testing-library/react';
import RefreshIcon from '../../src/elements/RefreshIcon';
import React from 'react';

describe('RefreshIcon', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<RefreshIcon />);
    const refreshIcon = getByTestId('refresh-icon');
    expect(refreshIcon).toBeInTheDocument();
  });
  

  it('applies disabled styling when disabled prop is true', () => {
    const { container } = render(<RefreshIcon disabled />);
    const refreshIcon = container.querySelector('.refresh-icon.disabled');
    expect(refreshIcon).toBeInTheDocument();
  });

  it('calls onClick function when clicked and not disabled', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<RefreshIcon onProgressClick={onClick} />);
    const refreshIcon = getByTestId('refresh-icon');
    fireEvent.click(refreshIcon);
    expect(onClick).toHaveBeenCalled();
  });
  

  it('does not call onClick function when clicked and disabled', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<RefreshIcon onClick={handleClick} disabled />);
    const refreshIcon = getByTestId('refresh-icon');
    fireEvent.click(refreshIcon);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies icon color prop correctly', () => {
    const ICON_COLOR = '#ff0000';
    const { getByTestId } = render(<RefreshIcon iconColor={ICON_COLOR} />);
    const canvasElement = getByTestId('refresh-icon');
    const canvasContext = canvasElement.getContext('2d');
    expect(canvasContext.strokeStyle).toBe(ICON_COLOR);
  });
  
  
  it('applies size prop correctly', () => {
    const { getByTestId } = render(<RefreshIcon size={30} />);
    const refreshIcon = getByTestId('refresh-icon');
    expect(refreshIcon).toHaveAttribute('width', '30');
    expect(refreshIcon).toHaveAttribute('height', '30');
  });
  

});
