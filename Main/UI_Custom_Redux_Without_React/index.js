// Custom State Management Library

// Creating a store which holds state tree, actions and reducers(pure functions)

/* 
Store should have :
 1. The State - local variable
 2. Get State - getState Function
 3. Listen and notify the state change. - subscribe Function
 4. Update the state -dispatch Function
 */

// Imports
import {
  add_todo,
  add_goal,
  rm_goal,
  comp_todo,
  rm_todo
} from "../helperFunctions/forTodoProject/constants.js";
import generateRandomID from "../helperFunctions/generateRandomId.js";
function createStore(reducer) {
  // Create a state local variable
  let state;
  let listeners = [];

  // getState
  const getState = () => state;

  // update the state
  const dispatch = action => {
    console.log(action);
    state = reducer(state, action);
    listeners.forEach(l => l()); // To show the listerners which u have . Basically to make the user know that we added it to the state.
  };

  // function which adds the listeners - To Notify the changes done to the state.
  const subscribe = listener => {
    listeners.push(listener); // to subscribe
    return listeners.filter(l => l !== listener); // to unsubscribe
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// reducers

// Todo Reducers - can do add, remove and toggle
function toDo(state = [], action) {
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

// Root reducer with two reducer functions.
function rootReducer(state = {}, action) {
  return {
    todo: toDo(state.todo, action),
    goal: goal(state.goal, action)
  };
}

// Creating an instance of the createStore function
let store = createStore(rootReducer);

// New State notifier listerner.
store.subscribe(() => {
  console.log("The new state is : ", store.getState());
  const { todo, goal } = store.getState();
  document.getElementById("taskAdded").innerHTML = "";
  document.getElementById("goalsAdded").innerHTML = "";
  todo.forEach(addTodoToP);
  goal.forEach(addGoalToP);
});

// Helper Functions:

// Helper function for creating an object while adding the task to the store.
function addtodo(todoValue, complete, id) {
  return {
    type: add_todo,
    todo: {
      id,
      todoValue,
      complete
    }
  };
}

// helper function for creating a object while adding the goal to the store.
function addgoal(id, goalValue) {
  return {
    type: add_goal,
    goal: {
      id,
      goalValue
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
// To Add a Todo Item
function addTodo() {
  console.log("clicked");
  const todoInput = document.getElementById("task");
  const todoValue = todoInput.value;
  todoInput.value = "";
  store.dispatch(addtodo(todoValue, false, generateRandomID()));
}

// To Add a Goal Item
function addGoal() {
  const goalInput = document.getElementById("goal");
  const goalValue = goalInput.value;
  goalInput.value = "";
  store.dispatch(addgoal(generateRandomID(), goalValue));
}

function addTodoToP(todo) {
  const node = document.createElement("p");
  node.id = "taskadded";
  const rmButton = document.createElement("button");
  node.onclick = () => {
    store.dispatch(completeToggleTodo(todo.id));
    const p_element = document.getElementById("taskadded");
    todo.complete == true
      ? (p_element.style.backgroundColor = "#63ea85")
      : (p_element.style.backgroundColor = "#ded6d6");
  };
  rmButton.style.cssFloat = "right";
  rmButton.innerText = "remove";
  rmButton.style.cursor = "pointer";
  rmButton.onclick = () => store.dispatch(removeTodo(todo.id));
  const text = document.createTextNode(todo.todoValue);
  node.appendChild(text);
  node.appendChild(rmButton);
  document.getElementById("taskAdded").appendChild(node);
}

function addGoalToP(goal) {
  const node = document.createElement("p");
  node.id = "goaladded";
  const rmButton = document.createElement("button");
  rmButton.style.cssFloat = "right";
  rmButton.innerText = "remove";
  rmButton.style.cursor = "pointer";
  rmButton.onclick = () => store.dispatch(removeGoal(goal.id));
  const text = document.createTextNode(goal.goalValue);
  node.appendChild(text);
  node.appendChild(rmButton);
  document.getElementById("goalsAdded").appendChild(node);
}

document.getElementById("todoButton").addEventListener("click", addTodo);
document.getElementById("goalButton").addEventListener("click", addGoal);
