import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}

type TodoState = {
  list: Todo[];
  loading: boolean,
  error: string | null
}

const initialState: TodoState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTodo = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
  'todos/fetchTodo',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }

    const data = await response.json()

    return data;
  }
);

export const deleteTodos = createAsyncThunk<string, string, { rejectValue: string }>(
  'todos/deleteTodos',
  async function (id, { rejectWithValue }) {

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return rejectWithValue('Can\'t delete task. Server error')
    }
    return id;
  }
);

export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodoState } }>(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {

    const todo = getState().todos.list.find(todo => todo.id === id);

    if (todo) {

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      })

      if (!response.ok) {
        return rejectWithValue('Can\'t change status. Server error')
      }

      return (await response.json()) as Todo;
    }
    return rejectWithValue('No such todo in the list')
  }
);

export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  'todos/addNewTodo',
  async function (text, { rejectWithValue }) {

    const todo = {
      title: text,
      useId: 1,
      completed: false,
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add task. Server error')
    }
    return (await response.json()) as Todo;

  }
)

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleTodo = state.list.find(todo => todo.id === action.payload.id)
        if (toggleTodo) {
          toggleTodo.completed = !toggleTodo.completed;
        };
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload)
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});
export default todoSlice.reducer;
