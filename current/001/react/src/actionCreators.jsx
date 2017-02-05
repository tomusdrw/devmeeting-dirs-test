import * as Actions from './actions.js';

//2/ Funkcje zwracające akcję nazwymay actionCreatorami
const actionCreators = createActionCreators(Actions);

// Dodajemy asynchroniczną akcję
actionCreators.fetchTodos = () => (dispatch) => {
  dispatch(actionCreators.fetchTodosStarted());

  fetch('./data/todos.json')
    .then(
      (todos) => todos.json().then(todos => dispatch(actionCreators.fetchTodosSuccess(todos))),
      (err) => dispatch(actionCreators.fetchTodosFailure(err))
    );
};

export default actionCreators;

//6/ Ta funkcja przypina dispatch do każdego creatora
export function bindActions(actions, dispatch) {
  return Object.keys(actions).reduce((allActions, action) => {
    allActions[action] = (payload) => dispatch(actions[action](payload));
    return allActions;
  }, {});
}

function createActionCreators(actions) {
  return Object.keys(actions).reduce((allActions, action) => {
    allActions[action] = (payload) => ({
      type: actions[action],
      payload,
      error: payload instanceof Error
    });
    return allActions;
  }, {});
}
