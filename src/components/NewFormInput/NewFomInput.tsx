interface NewTodoFormProps {
  text: string;
  handleInput: (str: string) => void;
  handelSubmit: () => void;

}
const NewFomInput: React.FC<NewTodoFormProps> = ({ text, handleInput, handelSubmit }) => {
  return (
    <label className="input-wrapper">
      <input
        placeholder="Add new todo" 
        value={text} className="set-width" onChange={(e) => handleInput(e.target.value)} />
      <button onClick={handelSubmit}>Add Todo</button>
    </label>
  )
}

export default NewFomInput