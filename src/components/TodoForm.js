import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/reducers/todosSlice';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        dispatch(addTodo(title));

        setTitle('');
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input style={{ cursor: 'pointer' }} type="submit" value="add" />
            </form>
        </div>
    );
};

export default TodoForm;
