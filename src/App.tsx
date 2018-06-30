import { createMuiTheme, CssBaseline, Grid, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import './App.css';
import { Configs } from './components/Configs';
import TextDealer from './components/TextDealer';

const theme = createMuiTheme();

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container={true}>
          {/* <Grid item={true} xs={12}>
            <AppBar>
              <Toolbar>Hey yo</Toolbar>
            </AppBar>
          </Grid> */}
          <Grid item={true} xs={6}>
            <Configs>
              <TextDealer />
            </Configs>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
