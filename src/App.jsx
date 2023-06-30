import React, { useEffect, useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [inCompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodotext = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") {
      return;
    }
    const newTodos = [...inCompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...inCompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompletTodos = [...completeTodos, inCompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompletTodos);
  };

  const onClickBack = (index) => {
    const newCompletTodos = [...completeTodos];
    newCompletTodos.splice(index, 1);

    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompletTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodotext}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
