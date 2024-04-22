import "./App.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";

import NewFomInput from "./components/NewFormInput/NewFomInput";
import TodoList from "./components/TodoList/TodoList";
import { addNewTodo, fetchTodo } from "./store/thunks";
import { Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

function App() {
  const [text, setText] = useState("");
  const { loading, error } = useAppSelector((state) => state.todos);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}`;
  }

  const date = getDate();

  console.log(date);
  const dispatch = useAppDispatch();
  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo({ title: text, date: date }));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <Flex className="App" vertical>
      <NewFomInput text={text} handleInput={setText} handelSubmit={addTask} />

      {loading && <Paragraph>Loading...</Paragraph>}
      {error && <Paragraph>An error occured:{error}</Paragraph>}
      <TodoList />
    </Flex>
  );
}

export default App;
