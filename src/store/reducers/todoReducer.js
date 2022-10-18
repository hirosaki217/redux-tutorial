const initialState = {
    todos: [
        {
            id: 1,
            title: 'viec 1',
            completed: false,
        },
        {
            id: 2,
            title: 'viec 2',
            completed: false,
        },
        {
            id: 3,
            title: 'viec 3',
            completed: false,
        },
    ],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: action.payload,
            };
        case 'MARK_COMPLETE':
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload) todo.completed = !todo.completed;
                    return todo;
                }),
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => action.payload !== todo.id),
            };
        default:
            return state;
    }
};

export default todoReducer;
