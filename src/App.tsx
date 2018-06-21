import { CssBaseline, Grid } from '@material-ui/core';
import * as React from 'react';
import './App.css';
import TextDealer from './components/TextDealer';


class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container={true}>
          {/* <Grid item={true} xs={12}>
            <AppBar>
              <Toolbar>Hey yo</Toolbar>
            </AppBar>
          </Grid> */}
          <Grid item={true} xs={6}>
            <TextDealer />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
