import * as React from 'react';
import './App.css';

import { AppBar, Toolbar } from '@material-ui/core';

class App extends React.Component {
  public render() {
    return (
      <AppBar>
        <Toolbar>Hey yo</Toolbar>
      </AppBar>
    );
  }
}

export default App;
