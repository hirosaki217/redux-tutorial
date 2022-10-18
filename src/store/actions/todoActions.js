import axios from 'axios';

export const markComplete = (id) => {
    const markCompleteAction = (dispatch) => {
        dispatch({
            type: 'MARK_COMPLETE',
            payload: id,
        });
    };
    return markCompleteAction;
};

export const addTodo = (todo) => (dispatch) =>
    dispatch({
        type: 'ADD_TODO',
        payload: todo,
    });

export const removeTodo = (id) => (dispatch) => dispatch({ type: 'REMOVE_TODO', payload: id });

export const getTodos = () => async (dispatch) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');

        dispatch({
            type: 'GET_TODOS',
            payload: response.data,
        });
    } catch (error) {
        console.log(error);
    }
};
