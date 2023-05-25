import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CircularProgressBar.css';
import RefreshIcon from './RefreshIcon';

const CircularProgressBar = ({ size, strokeWidth, circleColor, progressColor, value, enableWaitMode, onRefreshClick }) => {
  const canvasRef = useRef(null);
  const [startAngle, setStartAngle] = useState(-Math.PI / 2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    
    if (enableWaitMode) {
      value = 50;
    }
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const radius = size / 2 - strokeWidth / 2;
    const centerX = size / 2;
    const centerY = size / 2;
    const endAngle = 2 * Math.PI;
    const progressEndAngle = (value / 100) * 2 * Math.PI + startAngle;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background circle if the colour is set
    if (circleColor) {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, endAngle);
      context.strokeStyle = circleColor;
      context.lineWidth = strokeWidth;
      context.stroke();
    }

    // Draw the progress arc
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, progressEndAngle);
    context.strokeStyle = progressColor;
    context.lineWidth = strokeWidth;
    context.stroke();

  }, [size, strokeWidth, circleColor, progressColor, value, startAngle]);

  useEffect(() => {
    let timer;

    if (enableWaitMode) {
      timer = setInterval(() => {
        setStartAngle(prevStartAngle => prevStartAngle + Math.PI / 30);
      }, 10);
      
    } else {
      setStartAngle(-Math.PI / 2);
    }

    return () => clearInterval(timer);
  }, [enableWaitMode]);

  const handleRefreshClick = (event) => {
    console.log('refresh-icon-container clicked');
    if (event) {
      event.stopPropagation();
    }
    if (!enableWaitMode && onRefreshClick) {
      onRefreshClick();
    }
  };

  return (
    <div className={`circular-progress${enableWaitMode ? ' wait-mode' : ''}`} style={{ width: size, height: size }} data-testid="circular-progress" data-progress={value} data-enablewaitmode={enableWaitMode} >
      <canvas ref={canvasRef} width={size} height={size} data-testid="canvas" />
        <div className="refresh-icon-container" data-testid="refresh-icon-container"  >
          <RefreshIcon size={size} disabled={enableWaitMode} iconColor={progressColor} data-testid="refresh-icon" onProgressClick={handleRefreshClick} />
        </div>
    </div>
  );
};

CircularProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleColor: PropTypes.string,
  progressColor: PropTypes.string.isRequired,
  enableWaitMode: PropTypes.bool,
  onRefreshClick: PropTypes.func,
};

CircularProgressBar.defaultProps = {
  size: 120,
  strokeWidth: 8,
  progressColor: '#6b4e4e',
  value: 0,
  enableWaitMode: false,
};

export default CircularProgressBar;
