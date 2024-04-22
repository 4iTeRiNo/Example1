import { Button, Checkbox, Flex, Typography, Input } from "antd";
import classnames from "classnames";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { deleteTodos, editTodo, toggleStatus } from "../../store/thunks";
import styles from "./TodoItem.module.css";
import { ViewTodo } from "../Drawer/ViewTodo";

const { Text } = Typography;

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  description: string;
}

const TodoItem = ({
  id,
  title,
  completed,
  date,
  description,
}: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(title);
  const [descriptionTask, setDescriptionTask] = useState(description);

  const [open, setOpen] = useState(false);

  console.log(descriptionTask);

  const showDrawer = () => {
    setOpen(true);
  };

  const styleTodoText = classnames(styles.text, completed ? styles.done : " ");

  const editTask = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const updateTask = () => {
    dispatch(
      editTodo({
        id: id,
        title: text,
        description: descriptionTask,
      })
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Flex align="flex-start" justify="center" className={styles.listTodo}>
      <Checkbox
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      {isEdit ? (
        <Input
          autoCapitalize="false"
          onChange={(e) => editTask(e)}
          value={text}
        />
      ) : (
        <Text
          className={styleTodoText}
          onClick={showDrawer}
          data-value={text}
          key={id}
        >
          {text}
        </Text>
      )}
      {open ? (
        <ViewTodo
          onClose={onClose}
          open={open}
          id={id}
          text={text}
          date={date}
          description={description}
          setDescriptionTask={setDescriptionTask}
        />
      ) : (
        ""
      )}
      <Flex gap="small">
        <Button
          type="default"
          onClick={() => {
            setIsEdit(!isEdit);
            if (isEdit) {
              updateTask();
            }
          }}
        >
          {isEdit ? "done" : "edit"}
        </Button>
        <Button type="primary" onClick={() => dispatch(deleteTodos(id))}>
          delete
        </Button>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
