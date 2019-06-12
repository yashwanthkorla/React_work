const add_todo = "ADD_TODO",
  add_goal = "ADD_GOAL",
  rm_goal = "REMOVE_GOAL",
  comp_tod = "COMPLETE_TODO",
  rm_todo = "REMOVE_TODO";

function generateRandomId() {
  return (
    (Math.random() * 100).toString(36).substring(3) +
    new Date().getTime().toString(36)
  );
}

function todo(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "COMPLETE_TODO":
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

// Goal Reducer - Can add and remove.
function goal(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

const store = Redux.createStore(
  Redux.combineReducers({
    todo,
    goal
  })
);

store.subscribe(() => {
  console.log("The new state is : ", store.getState());
});
// Helper Functions:

// Helper function for creating an object while adding the task to the store.
function addtodo(name, complete, id) {
  return {
    type: add_todo,
    todo: {
      id,
      name,
      complete
    }
  };
}

// helper function for creating a object while adding the goal to the store.
function addgoal(id, name) {
  return {
    type: add_goal,
    goal: {
      id,
      name
    }
  };
}

function removeGoal(id) {
  // console.log(id)
  return {
    type: rm_goal,
    id
  };
}

function removeTodo(id) {
  return {
    type: rm_todo,
    id
  };
}
function completeToggleTodo(id) {
  return {
    type: comp_todo,
    id
  };
}

function List(props) {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
class Goal extends React.Component {
  addGoal = e => {
    e.preventDefault();
    const inputValue = this.input.value;
    this.input.value = "";
    this.props.store.dispatch(addgoal(generateRandomId(), inputValue));
  };
  render() {
    return (
      <div>
        <h1>Goals</h1>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.addGoal}>Add</button>
        <List items={this.props.goals} />
      </div>
    );
  }
}
class Todo extends React.Component {
  addTodo = e => {
    e.preventDefault();
    const inputValue = this.input.value;
    this.input.value = "";
    this.props.store.dispatch(addtodo(inputValue, false, generateRandomId()));
  };
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.addTodo}>Add</button>
        <List items={this.props.todos} />
      </div>
    );
  }
}
class App extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const store = this.props.store;
    const { todo,goal } = store.getState();
    return (
      <div>
        <Todo todos={todo} store={store} />
        <Goal goals={goal} store={store} />
      </div>
    );
  }
}

ReactDOM.render(<App store={store} />, document.getElementById("app"));
