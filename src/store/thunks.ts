import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../types";

const BASE = "http://localhost:3004/todos";

export const fetchTodo = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodo", async function (_, { rejectWithValue }) {
  const response = await fetch(BASE);

  if (!response.ok) {
    return rejectWithValue("Server Error");
  }

  const data = await response.json();

  return data;
});

export const deleteTodos = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodos", async function (id, { rejectWithValue }) {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return rejectWithValue("Can't delete task. Server error");
  }
  return id;
});

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodoState } }
>("todos/toggleStatus", async function (id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo?.id === id);

  if (todo) {
    const response = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    if (!response.ok) {
      return rejectWithValue("Can't change status. Server error");
    }

    return (await response.json()) as Todo;
  }
  return rejectWithValue("No such todo in the list");
});

export const addNewTodo = createAsyncThunk<
  Todo,
  Pick<Todo, "title" | "date">,
  { rejectValue: string }
>("todos/addNewTodo", async function ({ title, date }, { rejectWithValue }) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, date: date, completed: false }),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task. Server error");
  }
  return (await response.json()) as Todo;
});

export const editTodo = createAsyncThunk<
  Todo,
  Pick<Todo, "title" | "id" | "description">,
  { rejectValue: string }
>(
  "todos/editTodo",
  async function ({ id, title, description }, { rejectWithValue }) {
    const response = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (!response.ok) {
      return rejectWithValue("Can't change status. Server error");
    }

    return (await response.json()) as Todo;
  }
);
