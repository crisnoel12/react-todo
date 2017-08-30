import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="jumbotron">
                <h2 className="display-3 component-heading">Let's Get Productive!</h2>
                <p className="lead">A simple todo web application built with react.</p>
                <hr className="my-4"/>
                <Link to="/todos" className="btn btn-primary">Manage Todos</Link>
            </div>
        );
    }
}

export default Home;
