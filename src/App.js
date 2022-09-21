
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import MainRoutes from './routes/Routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>

        <Navbar />
        <MainRoutes />
        </div>
      </ThemeProvider>
    )
  }
}


