import './App.css';
import {useState, useEffect} from "react";
import Form from './components/Form.jsx';
import List from './components/List.jsx';

function App() {

  const [editInput, setEditValue] = useState('');
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
      setTodos(prev => [...prev, {
        text: input, 
        id: new Date(), 
        completed: false,
        isEdit: false,
      }]);
      setValue("");
    }
  }

  return (
    <div className="todo-app">
      <h1>TODO</h1>
      <Form onHandleSubmit={addTodo} value={input} setState={setValue} />
      <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <List 
                  setTodos={setTodos}
                  todos={todos}
                  id={todo.id}
                  editInput={editInput}
                  setEditValue={setEditValue}
                  completed={todo.completed}
                  text={todo.text}
                  isEdit={todo.isEdit}
                />
              </li>
            )
          })}
        </ul>
    </div>
  )

}

export default App;
