import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CircularProgressBar from './elements/CircularProgressBar';

const RefreshTimer = ({
  size,
  strokeWidth,
  circleColor,
  progressColor,
  step = 5,
  interval = 1000,
  refreshTimeout = 3000,
  onRefresh,
}) => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const handleRefresh = useCallback(() => {
        setLoading(true);
        setProgress(0);
        onRefresh();

        setTimeout(() => {
          setLoading(false);
          setProgress(0);
          
        }, refreshTimeout);
      }, [onRefresh, refreshTimeout]);
      
    useEffect(() => {
      let timer;
      if (!loading) {
        timer = setInterval(() => {
          setProgress((prevProgress) => {
            const nextProgress = prevProgress + step;
            return nextProgress >= 100 ? handleRefresh() : nextProgress;
          });
        }, interval);
      }
      return () => clearInterval(timer);
    }, [loading, step, interval, handleRefresh]);

  return (
    <div data-testid="refresh-timer">
        <CircularProgressBar
        size={size}
        strokeWidth={strokeWidth}
        circleColor={circleColor}
        progressColor={progressColor}
        value={progress}
        enableWaitMode={loading}
        onRefreshClick={handleRefresh}
        />
    </div>
  );
};

RefreshTimer.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  circleColor: PropTypes.string,
  progressColor: PropTypes.string,
  step: PropTypes.number,
  interval: PropTypes.number,
  refreshTimeout: PropTypes.number,
  onRefresh: PropTypes.func,
};

export { RefreshTimer };
