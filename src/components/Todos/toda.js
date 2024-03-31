import React, { useState } from "react";

function Todo(props) {
  return (
    <div>
      {props.todo.text}

      <div>
        <button onClick={() => props.completeTodo(props.key)}>Completed</button>
        <button onClick={() => props.removeTodo(props.key)}>X</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefaults();
    if (!value) {
      console.log("Empty");
      return;
    }
    console.log("value added");
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit"> Add </button>
    </form>
  );
}

function App() {
  const [todo, setTodos] = useState([
    {
      text: "Learn Python",
      isCompleted: true,
    },
    {
      text: "cooking",
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todo, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todo];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    var newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <div>
        {todo.map((tod, index) => {
          return (
            <Todo
              key={index}
              todo={tod}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            ></Todo>
          );
        })}
        <TodoForm addTodo={addTodo}></TodoForm>
      </div>
    </div>
  );
}

export default App;
