import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import TodoItem from './TodoItem';
import './styles/Todos.css';

class Todos extends Component {

    constructor() {
        super();
        this.state = {
            todos: []
        }
        this.todoApiUrl = 'http://localhost:8080/api/todos/';
    }

    reorderTodos = () => {
        let orderedTodos = this.state.todos.sort((x, y) => {
            return x.status - y.status || Date.parse(y.creation_date) - Date.parse(x.creation_date); // reorder todos by incomplete first and then by todo creation
        });
        this.setState({ todos: orderedTodos });
    }

    handleAddTodo = (e) => {
        e.preventDefault();
        let todos = this.state.todos;
        let title = this.refs.title.value.trim();
        if (title !== "") {
            axios.post(this.todoApiUrl, { title: title })
                .then( (res) => {
                    let newTodo = res.data.todo;
                    todos.unshift(newTodo);
                    this.setState({ todos: todos })
                    this.refs.title.value = ""; // reset input field to empty
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("You can't enter an empty todo!");
        }
        
    }

    handleDeleteTodo = (id) => {
        let todos = this.state.todos;
        let todo = todos.find(x => x._id === id);
        let index = todos.findIndex(x => x._id === id);
        axios.delete(this.todoApiUrl + todo._id)
            .then( (res) => {
                todos.splice(index, 1);
                this.setState({ todos: todos });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleStatusChange = (status, id) => {
        let todos = this.state.todos;
        let todo = todos.find(x => x._id === id);
        todo.status = !todo.status; // toggle todo status
        axios.put(this.todoApiUrl + todo._id, { status: todo.status })
            .then((res) => {
                this.reorderTodos();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get(this.todoApiUrl)
            .then((res) => {
                this.setState({
                    todos: res.data
                });
                this.reorderTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let todoItems = this.state.todos.map((todo, i) => {
            // create TodoItem component for each todo
            return (
                <TodoItem key={todo._id} todo={todo} deleteTodo={this.handleDeleteTodo} changeStatus={this.handleStatusChange} />
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
                        <form onSubmit={this.handleAddTodo}>
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
