import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { TodoState } from "../types";
import {
  addNewTodo,
  deleteTodos,
  editTodo,
  fetchTodo,
  toggleStatus,
} from "./thunks";

const initialState: TodoState = {
  list: [],
  loading: false,
  error: null,
  status: "all",
};

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

const todoSlice = createSlice({
  name: "todos",
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
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggleTodo) {
          toggleTodo.completed = !toggleTodo.completed;
        }
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const todo = state.list.find((todo) => todo.id === id);

        if (todo) {
          todo!.title = title;
        }
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export default todoSlice.reducer;
