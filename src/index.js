import ReactDOM from 'react-dom';
import React from 'react';
// 1. import createStore
import { createStore } from 'redux';

const defaultState = { checked: false };
// 2. define reducer
const reducer = function(state = defaultState, action) {
  switch(action.type) {
    case 'TOGGLE':
      return {
        ...state,
        checked: !state.checked
      };
  }
  return state;
}
// 3. create store
const store = createStore(reducer);
// store has 3 (important) functions
// 1. subscribe
// 2. dispatch
// 3. getstate

class App extends React.Component {
  constructor() {
    // always need to call super();
    super();
    this.state = store.getState();
    this.clicked = this.clicked.bind(this);
  }

  // TODO constructor vs. componentWillMount
  componentWillMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  clicked(event) {
    store.dispatch({ type: 'TOGGLE' });
  }

  render() {
    return (
      <div>
        <h1>To-dos</h1>
        <div>
          Learn Redux&nbsp;
          <input type="checkbox" onChange={this.clicked} checked={!!this.state.checked} />
        </div>
        {
          this.state.checked ? (<h2>Done!</h2>) : null
        }
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
