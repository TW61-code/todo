import './App.css';
import {useState, useEffect} from "react";

const completedStyles = {
  color: "hsl(0, 0%, 60%)",
  textDecoration: "line-through",
}

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

  function handleDeleteTodo(e, id) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  function handleCompleteTodo(e, id) {
    e.preventDefault();
    
    const completedTodos = todos.map((todo) => {
      return todo.id === id ? {...todo, completed: !todo.completed} : todo;
    });
    setTodos(completedTodos);
  }

  function handleEditTodo(e, id) {
    e.preventDefault();
    const updateTodos = todos.map((todo) => {
        return todo.id === id ? {...todo, isEdit: !todo.isEdit} : todo;
    });
    console.log(updateTodos);
    setTodos(updateTodos);
  }

  function handleSubmitEdit(e, id) {
    e.preventDefault();
    const updateTodos = todos.map((todo) => {
      if (todo.id === id && editInput !== '') {
        return {...todo, text: editInput, isEdit: false};
      } else {
        return {...todo, text: todo.text, isEdit: false};
      }
    });
    setTodos(updateTodos);
    setEditValue('');
  }

  function handleCancelEdit(e, id) {
    e.preventDefault();
    const updateTodos = todos.map((todo) => {
      return todo.id === id ? {...todo, isEdit: false} : todo;
    });
    setTodos(updateTodos);
    setEditValue('');
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
                {todo.isEdit ? 
                  <div className='isEdit'>
                    <input type='text' value={editInput} onChange={(e) => setEditValue(e.target.value)}/> 
                    <span onClick={(e) => handleSubmitEdit(e, todo.id)}>✔️</span>
                    <span onClick={(e) => handleCancelEdit(e, todo.id)}>❌</span>   
                  </div>
                  : 
                  <div className='isNotEdit'>
                    <p style={todo.completed ? completedStyles : {}}>{todo.text}</p>
                    <div className="todo-span-container">
                      <span onClick={(e) => handleEditTodo(e, todo.id)}>✏️</span>
                      <span onClick={(e) => handleCompleteTodo(e, todo.id)}>✔️</span>
                      <span onClick={(e) => handleDeleteTodo(e, todo.id)}>❌</span>   
                    </div>
                  </div>}
              </li>
            )
          })}
        </ul>
    </div>
  )

}

export default App;
