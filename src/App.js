
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import MainRoutes from './routes/Routes';

export default class App extends Component {
  render() {
    return (
        <div>

        <Navbar />
        <MainRoutes />
        </div>
    )
  }
}


