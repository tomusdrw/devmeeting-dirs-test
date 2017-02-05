import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import actionCreators from './actionCreators.js';
import {bindActions} from './actionCreators.js';
import store from './store.js';

class App extends React.Component {

  componentDidMount () {
    this.props.actions.fetchTodos();  
  }

  render () {
    return (
      <div>
        <h1>Val: {this.props.val}</h1>
        <button onClick={() => this.props.actions.increment()}>+</button>
        <button onClick={() => this.props.actions.decrement()}>-</button>
        <pre>{JSON.stringify(this.props.tasks, null, 2)}</pre>
      </div>
    );
  }
}

const App2 = connect(
  state => ({
    val: state.count,
    tasks: state.tasks
  }),
  dispatch => ({
    actions: bindActions(actionCreators, dispatch)
  })
)(App);

render(<App2 store={store} />, document.querySelector('#app'));
