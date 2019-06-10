// Custom State Management Library

// Creating a store which holds state tree, actions and reducers(pure functions)

/* 
Store should have :
 1. The State - local variable
 2. Get State - getState Function
 3. Listen and notify the state change. - subscribe Function
 4. Update the state -updateState Function
 */
function createStore(reducer) {
    // Create a state local variable
    let state
    let listeners = []
    
    // getState
    const getState = () => state

    // update the state
    const updateState = (action) => {
        state = reducer(state,action)
        listeners.forEach((l) => l()) // To show the listerners which u have . Basically to make the user know that we added it to the state.
    }
    
    // function which adds the listeners - To Notify the changes done to the state.
    const subscribe = (listener) => {
        listeners.push(listener) // to subscribe
        return (
            listeners.filter((l) => l !== listener) // to unsubscribe
        )
    }

    return (
        {
            getState,
            subscribe,
            updateState
        }
    )
}

// reducers 

// Todo Reducers - can do add, remove and toggle
function toDo(state=[],action){
    switch(action.type) {
        case 'ADD_TODO' :
          return state.concat([action.todo])
        case 'REMOVE_TODO' :
          return state.filter((todo) => todo.id !== action.id)
        case 'COMPLETE_TODO' :
          return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, { complete: !todo.complete }))
        default :
          return state
      }
}

// Goal Reducer - Can add and remove.
function goal(state=[],action){
    switch(action.type) {
        case 'ADD_GOAL' :
          return state.concat([action.goal])
        case 'REMOVE_GOAL' :
          return state.filter((goal) => goal.id !== action.id)
        default :
          return state
      }
}

// Root reducer with two reducer functions.
function rootReducer(state={},action){
    return {
        todo : toDo(state.todo,action),
        goal : goal(state.goal,action)
    }
}

// Creating an instance of the createStore function
let store = createStore(rootReducer);

// New State notifier listerner.
store.subscribe(() => {
    console.log("The new state is : " , store.getState())
})

// Helper Function to generate random id:
function generateRandomID(){
    return ((Math.random()*100).toString(36).substring(3)) + (new Date().getTime().toString(36))
}

// Constant Strings
const add_todo = "ADD_TODO",add_goal = "ADD_GOAL";

// Helper function for creating an object while adding the task to the store.
function addtodo(todoValue,complete,id){
    return {
        type:add_todo,
        todo:{
            id,
            todoValue,
            complete
        }
    }
}

// helper function for creating a object while adding the goal to the store.
function addgoal(id,goalValue){
    return ({
        type: add_goal,
        goal:{
            id,
            goalValue
        }
    })
}
// To Add a Todo Item
function addTodo(){
    const todoInput = document.getElementById('task')
    const todoValue = todoInput.value
    todoInput.value = ''
    store.updateState(addtodo(todoValue,false,generateRandomID()))
}

// To Add a Goal Item
function addGoal(){
    const goalInput = document.getElementById('goal')
    const goalValue = goalInput.value
    goalInput.value = ''
    store.updateState(
        addgoal(generateRandomID(),goalValue)
    )
}

