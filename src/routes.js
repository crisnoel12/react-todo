import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Todos from './components/Todos.js';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/todos" component={Todos}/>
        </Switch>
    </Router>
);

export default Routes;
