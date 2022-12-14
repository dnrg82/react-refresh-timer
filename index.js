import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

function RefreshIcon(props) {
    return (
      <Box sx={{ position: 'absolute', top: 10, left: 10}}>
        <svg fill={props.color} stroke={"none"} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px" position='absolute' left='8px'>
            
            <path d="M 24 5 C 16.291968 5 10 11.291968 10 19 L 10 28.171875 L 8.4140625 26.585938 A 2.0002 2.0002 0 0 0 6.9785156 25.980469 A 2.0002 2.0002 0 0 0 5.5859375 29.414062 L 10.408203 34.236328 A 2.0002 2.0002 0 0 0 13.599609 34.228516 L 18.414062 29.414062 A 2.0002 2.0002 0 1 0 15.585938 26.585938 L 14 28.171875 L 14 19 C 14 13.454032 18.454032 9 24 9 C 26.184807 9 28.180172 9.6997689 29.830078 10.888672 A 2.0002 2.0002 0 1 0 32.169922 7.6445312 C 29.875828 5.9914341 27.047193 5 24 5 z M 35.970703 12.972656 A 2.0002 2.0002 0 0 0 34.40625 13.765625 L 29.585938 18.585938 A 2.0002 2.0002 0 1 0 32.414062 21.414062 L 34 19.828125 L 34 29 C 34 34.545968 29.545968 39 24 39 C 21.815193 39 19.819828 38.300231 18.169922 37.111328 A 2.0002 2.0002 0 1 0 15.830078 40.355469 C 18.124172 42.008566 20.952807 43 24 43 C 31.708032 43 38 36.708032 38 29 L 38 19.828125 L 39.585938 21.414062 A 2.0002 2.0002 0 1 0 42.414062 18.585938 L 37.585938 13.757812 A 2.0002 2.0002 0 0 0 35.970703 12.972656 z"/>
        </svg>
    </Box>
    );
  }

function CircularProgressWithIcon(props) {
  return (
    <Tooltip title="Auto-refresh. Click to refresh now.">
        <Box sx={{ position: 'relative', display: 'inline-flex', cursor: 'pointer', width: '40px', height: '40px' }}>
            <RefreshIcon color={"#ffffff"} />
            <CircularProgress 
                variant="determinate"    
                color="primary"         
                {...props} 
            />
        </Box>
    </Tooltip>
  );
}

function CircularWaitWithIcon() {
    return (
      <Tooltip title="Auto-refresh. Click to refresh now.">
          <Box sx={{ position: 'relative', display: 'inline-flex', cursor: 'pointer', width: '40px', height: '40px' }}>
              <RefreshIcon color="#4c4c4c" />
              <CircularProgress 
                  variant="indeterminate"    
                  color="primary"         
              />
          </Box>
      </Tooltip>
    );
  }


CircularProgressWithIcon.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

RefreshIcon.propTypes = {
    color: PropTypes.string,
}

RefreshTimer.propTypes = {
    onUpdate: PropTypes.func,
    step: PropTypes.number,
    interval: PropTypes.number,
}

export default function RefreshTimer({onUpdate, step, interval}) {
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);

    function handleClick () {

        setLoading(true);

        return 0; // return 0 back to setProgress() when called by that function
    }

  React.useEffect(() => {
    if (!loading) {
        const timerAutoRefresh = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? handleClick() : prevProgress + step));
        }, interval);
        return () => {
            clearInterval(timerAutoRefresh);
        };
    }
  });

  React.useEffect(() => {
    if (loading)
    {
        onUpdate();

        const timerReload = setInterval(() => {
            setLoading(() => (false));
            setProgress(0);
    
        }, 3000);
        return () => {
            clearInterval(timerReload);
        };
    }
  }, [loading, onUpdate]);


  

  return (
      <>
        {
          loading ? <CircularWaitWithIcon /> : <CircularProgressWithIcon value={progress} onClick={handleClick} />
        }
        </>
    );


}

RefreshTimer.defaultProps = {
  interval: 1000,
  step: 5
}