import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './app.css';
import News from './News';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            <img src={logo} className="app-logo" alt="logo" />
            <span>FasterLoad</span>
          </h1>
        </header>
        <News />
        <Footer />
      </div>
    );
  }
}

export default App;
