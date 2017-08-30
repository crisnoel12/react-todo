import React, { Component } from 'react';
import './App.css';
import Routes from './routes.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2><span className="todoLogo">&#9998;</span> CN TODO APP</h2>
                </div>
                <Routes />
            </div>
        );
    }
}

export default App;
