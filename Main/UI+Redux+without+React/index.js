/* Using Redux state management library.
Rules :
1. Use getState,subscribe & dispatch to get,listen and modify the state.
*/

// reducers 
// Todo Reducers - can do add, remove and toggle

// Imports
import {add_todo,add_goal,rm_goal,comp_todo,rm_todo} from '../helperFunctions/forTodoProject/constants'


function todo(state=[],action){
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


let store = Redux.createStore(Redux.combineReducers({
    todo,
    goal
}));

// New State notifier listerner.
store.subscribe(() => {
    console.log("The new state is : " , store.getState())
    const {todo,goal} = store.getState()
    document.getElementById('taskAdded').innerHTML = '';
    document.getElementById('goalsAdded').innerHTML = '';
    todo.forEach(addTodoToP)
    goal.forEach(addGoalToP)
})

// Helper Function to generate random id:
function generateRandomID(){
    return ((Math.random()*100).toString(36).substring(3)) + (new Date().getTime().toString(36))
}


// Helper Functions:

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

function removeGoal(id){
    // console.log(id)
    return ({
        type: rm_goal,
        id
    })
}

function removeTodo(id){
    return ({
        type : rm_todo,
        id
    })
}
function completeToggleTodo(id){
    return ({
        type : comp_todo,
        id
    })
}
// To Add a Todo Item
function addTodo(){
    const todoInput = document.getElementById('task')
    const todoValue = todoInput.value
    todoInput.value = ''
    store.dispatch(addtodo(todoValue,false,generateRandomID()))
}

// To Add a Goal Item
function addGoal(){
    const goalInput = document.getElementById('goal')
    const goalValue = goalInput.value
    goalInput.value = ''
    store.dispatch(
        addgoal(generateRandomID(),goalValue)
    )
}

function addTodoToP(todo){
    const node = document.createElement('p')
    node.id = 'taskadded'
    const rmButton = document.createElement('button')
    node.onclick = () => {
        store.dispatch(completeToggleTodo(todo.id))
        const p_element = document.getElementById("taskadded")
        todo.complete == true ? p_element.style.backgroundColor = "#63ea85": p_element.style.backgroundColor = "#ded6d6"
    }
    rmButton.style.cssFloat = 'right'
    rmButton.innerText = "remove"
    rmButton.style.cursor = "pointer"
    rmButton.onclick = () => store.dispatch(removeTodo(todo.id))
    const text = document.createTextNode(todo.todoValue)
    node.appendChild(text)
    node.appendChild(rmButton)
    document.getElementById('taskAdded').appendChild(node)
}

function addGoalToP(goal){
    const node = document.createElement('p')
    node.id = "goaladded"
    const rmButton = document.createElement('button')
    rmButton.style.cssFloat = 'right'
    rmButton.innerText = "remove"
    rmButton.style.cursor = "pointer"
    rmButton.onclick = () => store.dispatch(removeGoal(goal.id))
    const text = document.createTextNode(goal.goalValue)
    node.appendChild(text)
    node.appendChild(rmButton)
    document.getElementById('goalsAdded').appendChild(node)
}

