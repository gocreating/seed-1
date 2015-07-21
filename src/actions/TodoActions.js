import alt from '../alt';

class TodoActions {
  updateTodo(id, text) {
    return { id, text };
  }
}

export default alt.createActions(TodoActions);