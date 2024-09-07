import React from "react";

const completedStyles = {
    color: "hsl(0, 0%, 60%)",
    textDecoration: "line-through",
}

function List({
    id,
    editInput,
    setEditValue,
    setTodos,
    completed,
    text,
    isEdit,
    todos,
}) {

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

        if (isEdit) {
            return(
              <div className='isEdit'>
                <input type='text' value={editInput} onChange={(e) => setEditValue(e.target.value)}/> 
                <span onClick={(e) => handleSubmitEdit(e, id)}>✔️</span>
                <span onClick={(e) => handleCancelEdit(e, id)}>❌</span>   
              </div>
            );
          } else {
            return(
              <div className='isNotEdit'>
                <p style={completed ? completedStyles : {}}>{text}</p>
                <div className="todo-span-container">
                  <span onClick={(e) => handleEditTodo(e, id)}>✏️</span>
                  <span onClick={(e) => handleCompleteTodo(e, id)}>✔️</span>
                  <span onClick={(e) => handleDeleteTodo(e, id)}>❌</span>   
                </div>
              </div>
            );
          }
}

export default List;