import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

// Reducer Thunk
export const getTodos = createAsyncThunk('todos/todosFetched', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');

    return response.data;
});

export const addTodo = createAsyncThunk('todos/todoAdded', async (title) => {
    const todo = {
        id: nanoid(),
        title: title,
        completed: false,
    };
    await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
    return todo;
});

export const deleteATodo = createAsyncThunk('todos/deletedTodo', async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: [],
    },
    reducers: {
        // addTodo: {
        //     reducer(state, action) {
        //         state.allTodos.unshift(action.payload);
        //     },
        //     prepare(title) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false,
        //             },
        //         };
        //     },
        // },

        markCompleted(state, action) {
            const todoId = action.payload;
            state.allTodos.map((todo) => {
                if (todo.id === todoId) todo.completed = !todo.completed;
                return todo;
            });
        },
        // deleteATodo(state, action) {
        //     const todoId = action.payload;
        //     state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
        // },

        // todosFetched(state, action) {
        //     state.allTodos = action.payload;
        // },
    },
    extraReducers: {
        // get all todos
        [getTodos.pending]: (state, action) => {
            console.log('fetching todos from backend...');
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log('done');
            state.allTodos = action.payload;
        },
        [getTodos.rejected]: (state, action) => {
            console.log('failed to get todos!');
        },
        // add todo
        [addTodo.pending]: (state, action) => {
            console.log('fetching todos from backend...');
        },
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload);
        },
        // deleteATodo
        [deleteATodo.pending]: (state, action) => {
            console.log('delete a todo from backend...');
        },
        [deleteATodo.fulfilled]: (state, action) => {
            state.allTodos = state.allTodos.filter((todo) => todo.id !== action.payload);
        },
    },
});
// Async action creator, action and reducer dispatch
// export const getTodos = () => {
//     const getTodosAsync = async (dispatch) => {
//         try {
//             const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
//             dispatch(todosFetched(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return getTodosAsync;
// };

// export const getTodos = () => async (dispatch) => {
//     try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
//         dispatch(todosFetched(response.data));
//     } catch (error) {
//         console.log(error);
//     }
// };

// Reducer
const todosReducer = todosSlice.reducer;
// Selectors
export const todosSelector = (state) => state.todosReducer.allTodos;
// action
export const {
    // todosFetched,
    // addTodo,
    markCompleted,
    // deleteATodo,
} = todosSlice.actions;
export default todosReducer;
