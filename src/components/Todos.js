import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todosSelector, markCompleted, getTodos, deleteATodo } from '../store/reducers/todosSlice';
import TodoForm from './TodoForm';

const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(todosSelector);
    const toggleTodoCompleted = (todoId) => {
        dispatch(markCompleted(todoId));
    };
    const deleteTodo = (todoId) => {
        dispatch(deleteATodo(todoId));
    };

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);
    return (
        <div className="todo-list">
            <TodoForm />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={toggleTodoCompleted.bind(this, todo.id)}
                        />
                        <button onClick={deleteTodo.bind(this, todo.id)}>delete</button>
                    </li>
                ))}{' '}
            </ul>
        </div>
    );
};

export default Todos;
