import './App.css';
import {useState} from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setValue] = useState();

  function addTodo(e) {
    e.preventDefault();
    //add an object and it's property to existing array.
    setTodos(prev => [...prev, {text: input}]);
  }

  function updateTodos(id) {
    setTodos(todos.filter(todo => todo.text !== id));
  }

  return (
    <form onSubmit={addTodo}>
      <input value={input} onChange={(e) => setValue(e.target.value)} />
      <button>Submit</button><br></br>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              {todo.text}
              <button onClick={() => updateTodos(todo.text)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </form>
  )

}

export default App;
