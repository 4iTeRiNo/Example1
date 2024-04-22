export type Todo = {
  id: string;
  completed: boolean;
  title: string;
  date: string;
  description: string;
};

export type TodoState = {
  list: Todo[];
  status: "all" | "open" | "completed";
  loading: boolean;
  error: string | null;
};
