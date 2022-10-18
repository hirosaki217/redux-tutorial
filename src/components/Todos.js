import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import { markComplete, removeTodo, getTodos } from '../store/actions/todoActions';

const Todos = ({ todos, markComplete, removeTodo, getTodos }) => {
    useEffect(() => {
        getTodos();
    }, []);
    return (
        <div className="todo-list">
            <TodoForm />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                        <input onChange={markComplete.bind(this, todo.id)} type="checkbox" />
                        <button onClick={removeTodo.bind(this, todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    getTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    todos: state.myTodos.todos,
});

export default connect(mapStateToProps, { markComplete, removeTodo, getTodos })(Todos);
