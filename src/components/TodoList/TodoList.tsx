import TodoItem from "../TodoItem/TodoItem";
import { useAppSelector } from "../../hooks";
import { Flex } from "antd";
import styles from "./TodoList.module.css";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.list);

  return (
    <Flex vertical justify="center" className={styles.FlexList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </Flex>
  );
};

export default TodoList;
