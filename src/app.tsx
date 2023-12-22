import React from "react";
import { createId } from "@paralleldrive/cuid2";
import { type TodoType } from "./types";
import { Todo } from "./todo.tsx";

function normalizeAndRemoveDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const App: React.FC = () => {
  const [query, setQuery] = React.useState<string | undefined>();
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const filteredTodos = todos.filter((todo) =>
    query !== undefined
      ? normalizeAndRemoveDiacritics(todo.description.toLowerCase()).includes(
          normalizeAndRemoveDiacritics(query.toLowerCase())
        )
      : true
  );

  const [todoInput, setTodoInput] = React.useState<
    TodoType["description"] | undefined
  >();

  function addTodo(): void {
    if (todoInput === undefined) return;

    setTodos((prev) => [
      ...prev,
      {
        description: todoInput,
        completed: false,
        id: createId(),
      },
    ]);
  }

  return (
    <div id="main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
          setTodoInput("");
        }}
      >
        <label>
          Todo
          <input
            type="text"
            name="todo-description"
            value={todoInput}
            onChange={(ev) => {
              setTodoInput(ev.target.value);
            }}
          />
        </label>

        <button type="submit">Add</button>
      </form>

      <label>
        Search a Todo
        <input
          type="text"
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
          }}
        />
      </label>

      {filteredTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};
