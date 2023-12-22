import React from "react";
import { TodoType } from "./types.ts";

type Props = {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Todo: React.FC<Props> = ({ todo, setTodos }) => {
  function removeTodo(todoId: TodoType["id"]): void {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  }

  function toggleTodo(todoId: TodoType["id"]): void {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  }

  return (
    <label style={{ display: "flex" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          toggleTodo(todo.id);
        }}
      />
      <p>{todo.description}</p>

      <button
        type="button"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        X
      </button>
    </label>
  );
};
