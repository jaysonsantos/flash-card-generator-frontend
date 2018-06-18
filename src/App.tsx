import { AppBar, Grid, Toolbar } from '@material-ui/core';
import * as React from 'react';
import './App.css';
import TextParser from './components/TextParser';


class App extends React.Component {
  public render() {
    return (
      <div>
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <AppBar>
              <Toolbar>Hey yo</Toolbar>
            </AppBar>
          </Grid>
          <Grid item={true}>
            <TextParser />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
