import { Button, Flex, Input, Typography } from "antd";
import { SetStateAction } from "react";

interface NewTodoFormProps {
  text: string;
  handleInput: (str: string) => void;
  handelSubmit: () => void;
}
const NewFomInput = ({ text, handleInput, handelSubmit }: NewTodoFormProps) => {
  const length = text.trim().length;
  return (
    <Flex>
      <Input
        autoCapitalize="false"
        value={text}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Add Todo"
        id="NewToDo"
      />
      <Button
        onClick={handelSubmit}
        type="primary"
        disabled={length !== 0 ? false : true}
      >
        Add Task
      </Button>
    </Flex>
  );
};

export default NewFomInput;
