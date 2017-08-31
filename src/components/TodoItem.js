import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

    deleteTodo = (id) => {
        this.props.deleteTodo(id);
    }

    changeStatus = (status, id) => {
        this.props.changeStatus(status, id);
    }

    render() {
        let id = this.props.todo.id;
        let title = this.props.todo.title;
        let status = this.props.todo.status;
        return (
            <tr>
                <td className={status ? 'complete' : 'incomplete'}>{title}</td>
                <td className="text-center">
                    <input className="align-middle" type="checkbox" name="status" title="Change todo status" onChange={() => this.changeStatus(status, id)} checked={status}/>
                    <a className="delete-btn align-middle" title="Delete todo" onClick={() => this.deleteTodo(id)}>✘</a>
                </td>
            </tr>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        status: PropTypes.bool
    }),
    deleteTodo: PropTypes.func,
    changeStatus: PropTypes.func
}

export default TodoItem;
