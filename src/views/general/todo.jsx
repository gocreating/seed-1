import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

const ENTER_KEY_CODE = 13;

function getTodoState() {
  return {
    allTodos: TodoStore.getState().todos,
  };
}

export default class TodoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTodoState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    TodoStore.listen(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(getTodoState());
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      const id = (
        +new Date() +
        Math.floor(Math.random() * 999999)
      ).toString(36);
      TodoActions.updateTodo(id, event.target.value);
    }
  }

  render() {
    return (
      <DefaultLayout>
        <input
          type="text"
          onKeyDown={this._onKeyDown} />

        <ul>
          {this.state.allTodos.map((todo) => {
            return (
              <li key={todo.id}>{todo.text}</li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}