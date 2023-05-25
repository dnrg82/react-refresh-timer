import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RefreshIcon.css'; // import your CSS file for styling

const RefreshIcon = ({ size, disabled, onProgressClick, iconColor }) => {
  const canvasRef = useRef(null);
  const iconSize = size * 0.5;
  const handleClick = () => {
    console.log("RefreshIcon handleClick called");
    if (!disabled && onProgressClick) {
      onProgressClick();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the refresh icon
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = iconColor;
    context.lineWidth = size / 35;
    
    context.arc(size / 2, size / 2, iconSize / 2, 0, 2 * Math.PI);
    context.moveTo((size / 2 - iconSize / 13), (size / 2) - (size / 8));
    context.lineTo((size / 2 - iconSize / 13), (size / 2) + (size / 8));
    context.lineTo((size / 2 - iconSize / 5), (size / 1.8));

    context.moveTo((size / 2 + iconSize / 13), (size / 2) + (size / 8));
    context.lineTo((size / 2 + iconSize / 13), (size / 2) - (size / 8));
    context.lineTo((size / 2 + iconSize / 5), (size / 2.2));

    context.stroke();

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    } 

  }, [size, disabled]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`refresh-icon${disabled ? ' disabled' : ''}`}
      data-testid="refresh-icon"
      disabled={disabled ? true : undefined}
      onClick={() => {handleClick}}
    />
  );
};

RefreshIcon.propTypes = {
  size: PropTypes.number,
  disabled: PropTypes.bool,
  onProgressClick: PropTypes.func,
};

RefreshIcon.defaultProps = {
  size: 24,
  disabled: false,
};

export default RefreshIcon;
