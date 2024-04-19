import { useAppDispatch } from "../../hooks";
import { deleteTodos, toggleStatus } from "../../store/todoSlice";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodos(id))}>
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
