import './App.css';
import {useState, useEffect} from "react";

function App() {

  const [input, setValue] = useState();
  const [todos, setTodos] = useState(() => {
    let storedTodos = localStorage.getItem('TODOS'); 
    return storedTodos ? JSON.parse(storedTodos) : []
  });

  useEffect(() => {
    console.log('saving todos to local storage', todos);
    localStorage.setItem('TODOS', JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();

    if (input === "") {
      return;
    } else {
      //add an object and it's property to existing array.
      setTodos(prev => [...prev, {text: input, id: new Date()}]);
      setValue("");
    }
  }

  function deleteTodos(e, id) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  function completeTodos(e, id) {
    e.preventDefault();
    const completedTodo = todos.find((todo) => todo.id === id);
    //Figure out how I can change the specific todo items styling to indicate that the the task is complete.
  }

  return (
    <div className="todo-app">
      <h1>TODO</h1>
      <form onSubmit={addTodo}>
        <input type="text" value={input} onChange={(e) => setValue(e.target.value)} />
        <button>Submit</button>
      </form>
      <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                {todo.text}
                <button onClick={(e) => completeTodos(e, todo.id)}>Complete</button>
                <button onClick={(e) => deleteTodos(e, todo.id)}>Delete</button>
              </li>
            )
          })}
        </ul>
    </div>
  )

}

export default App;
