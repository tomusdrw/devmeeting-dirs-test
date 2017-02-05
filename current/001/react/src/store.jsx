import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as Actions from './actions.js';

const tasks = createReducer({
  todos: [],
  fetching: false
}, {
  [Actions.increment](state, action) {
    //3/ W ES7 będzie to wyglądać lepiej dzięki `{...state}`
    return Object.assign({}, state, {
      todos: [...state.todos, `New task no ${state.todos.length + 1}`]
    });
  },
  //5/ Definiujemy nową akcję do obsługi rozpoczęcia pobierania
  [Actions.fetchTodosStarted](state) {
    return Object.assign({}, state, {
      fetching: true
    });
  },
  //5/ oraz skończonego pobierania
  [Actions.fetchTodosSuccess](state, action) {
    return Object.assign({}, state, {
      fetching: false,
      todos: [...state.todos, ...action.payload]
    });
  }
});

const count = createReducer(3, {
  [Actions.increment](state) {
    return state + 1;
  },

  [Actions.decrement](state) {
    return state - 1;
  }
})

const reducer = combineReducers({
  tasks: tasks,
  count
});

export default applyMiddleware(
  // Redux-thunk: https://github.com/gaearon/redux-thunk
  ({dispatch, getState}) => {
    return (next) => (action) => {
      return typeof action === 'function' ? action(dispatch, getState) : next(action);
    };
  },
  (store) => (next) => (action) => {
    console.log(store.getState(), action);
    next(action);
  }
)(createStore)(reducer);

//8/ Ta pomocnicza funkcja pozwola nam tworzyć reducery.
function createReducer(initialState, clazz) {
  return function reducer(state = initialState, action) {
    if (clazz[action.type]) {
      return clazz[action.type](state, action);
    }
    return state;
  };
}
