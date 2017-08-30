import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import todosMock from '../mock/todos';
import TodoItem from './TodoItem';
import './styles/Todos.css';

class Todos extends Component {

    constructor() {
        super();
        this.state = {
            todos: todosMock
        }
    }

    reorderTodos() {
        let orderedTodos = this.state.todos.sort((x, y) => {
            return x.status - y.status || y.id - x.id; // reorder todos by incomplete first and then by todo creation
        });
        this.setState({ todos: orderedTodos });
    }

    handleAddTodo(e) {
        e.preventDefault();
        let id = Math.max.apply(null, this.state.todos.map(x => x.id)); // return last todo id
        let title = this.refs.title.value.trim();
        if (title !== "") {
            let newTodo = { id: id + 1, title: title, status: false }
            let todos = this.state.todos;
            todos.unshift(newTodo);
            this.setState({
                todos: todos
            });
            this.refs.title.value = ""; // reset input field to empty
        } else {
            alert("You can't enter an empty todo!");
        }
        
    }

    handleDeleteTodo(id) {
        let todos = this.state.todos;
        let index = todos.findIndex(x => x.id === id);
        todos.splice(index, 1);
        this.setState({ todos: todos });
    }

    handleStatusChange(status, id) {
        let todos = this.state.todos;
        let todo = todos.find(x => x.id === id);
        todo.status = !todo.status; // toggle todo status
        this.reorderTodos();
    }

    componentWillMount() {
        this.reorderTodos(); // reorderTodos before App component mounts
    }

    render() {
        let todoItems = this.state.todos.map((todo, i) => {
            // create TodoItem component for each todo
            return (
                <TodoItem key={todo.id} todo={todo} deleteTodo={this.handleDeleteTodo.bind(this)} changeStatus={this.handleStatusChange.bind(this)} />
            );
        });
        return (
            <div className="component-heading container">
                <h2>Todos</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-left">
                            <Link to="/" className="back-btn">Go Back</Link>
                        </div>
                        <form onSubmit={this.handleAddTodo.bind(this)}>
                            <div className="row">
                                <div className="col-md-8">
                                    <input className="form-control" type="text" placeholder="Add new todo" ref="title" />
                                </div>
                                <div className="col-md-4">
                                    <input className="btn btn-primary form-control" type="submit" name="add" value="Add" />
                                </div>
                            </div>
                        </form>
                        <table className="table table-striped text-left">
                            <tbody>
                                {todoItems}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todos;
