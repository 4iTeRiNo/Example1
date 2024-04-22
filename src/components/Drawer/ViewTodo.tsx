import { Drawer, Typography, Input, Flex } from "antd";
import { Dispatch, SetStateAction } from "react";
const { Text } = Typography;
const { TextArea } = Input;

interface ViewTodoProps {
  onClose: () => void;
  open: boolean;
  id?: string;
  text: string;
  date: string;
  description: string;
  setDescriptionTask: Dispatch<SetStateAction<string>>;
}

export const ViewTodo = ({
  onClose,
  open,
  text,
  date,
  description,
  setDescriptionTask,
}: ViewTodoProps) => {
  return (
    <Drawer title="View Todo" onClose={onClose} open={open}>
      <Flex vertical>
        <Text>{`Created: ${date}`}</Text>
        <Text>{`Title: ${text}`}</Text>
        <Text>
          Description :
          <TextArea
            rows={2}
            value={description}
            onChange={(e) => setDescriptionTask(e.target.value)}
          />
        </Text>
      </Flex>
    </Drawer>
  );
};
