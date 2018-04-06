import React from "react";
import { render } from "react-dom";

let id = 0;

const Todo = props => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />
    <button onClick={props.deletar}>Deletar</button>
    <span>{props.todo.text}</span>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("TODO text please!");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  removeTodo(idClicado) {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== idClicado)]
    });
  }

  toggleTodo(idClicado) {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => {
          if (todo.id !== idClicado) return todo;

          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked
          };
        })
      ]
    });
  }

  render() {
    return (
      <div>
        <div>Total de itens: {this.state.todos.length} </div>
        <div>
          Total de itens incompletos:{" "}
          {this.state.todos.filter(todo => !todo.checked).length}
        </div>
        <button onClick={() => this.addTodo()}>Adicionar Item</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              todo={todo}
              onToggle={() => this.toggleTodo(todo.id)}
              deletar={() => this.removeTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
