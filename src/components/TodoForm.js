import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from '../store/actions/todoActions';
import PropTypes from 'prop-types';
const TodoForm = ({ addTodo }) => {
    const inputRef = useRef();
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if (text !== '') {
            addTodo({
                id: uuidv4(),
                title: text,
                completed: false,
            });
            setText('');
            inputRef.current.focus();
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

TodoForm.propsType = {
    addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addTodo })(TodoForm);
