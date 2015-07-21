import alt from '../alt';
import TodoActions from '../actions/TodoActions'

class TodoStore {
  constructor() {
    this.bindActions(TodoActions);
    this.todos = [];
  }

  onUpdateTodo(todo) {
    this.todos = this.todos.concat(todo);
  }
}

export default alt.createStore(TodoStore, 'TodoStore');