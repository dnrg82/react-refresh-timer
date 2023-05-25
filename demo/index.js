import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BitcoinPrice from './BitcoinPrice';
import BitcoinChart from './BitcoinChart';
import RefreshTimer from '../src/index';
import RefreshIcon from '../src/elements/RefreshIcon';

function App() {
  const [elapsedTime, setElapsedTime] = useState(0); // state variable to keep track of elapsed time
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleUpdate(1);
  }, []);

  const handleUpdate = (price) => {
    setKey(key + 1);

    console.log("handleUpdate called");
    //const time = new Date().toLocaleTimeString();
    //setData((prevState) => [...prevState, { time, price }]);
  };

  const handleRefreshClick = () => {
    console.log("handleRefreshClick called");
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Demo App
          </Typography>
          <RefreshTimer
            size={50}
            strokeWidth={5}
            progressColor="#ffffff"
            step={5}
            interval={200}
            refreshTimeout={3000}
            onRefresh={handleUpdate}
          />
        </Toolbar>
      </AppBar>
      <BitcoinChart key={key}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
