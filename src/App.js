import React, { Component } from 'react'
import Head from './components/head'
import Home from './views/home'

class App extends Component {
  render() {
    return (
        <div>
            <Head/>
            <Home/>
        </div>
    );
  }
}

export default App;
