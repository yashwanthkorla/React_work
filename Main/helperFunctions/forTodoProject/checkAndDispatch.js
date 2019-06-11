import {add_goal,add_todo} from './constants.js'
// use this helper when u want to filter some task before updating the store.
const filter_value = "<Your filter value like stupid in the value shouldnt dispatch>"
export default function checkAndDispatch(store,action){
    if(action.type === add_goal && action.goal.goalValue.toLowerCase().includes(filter_value) ){
        return alert(`You cant add this goal with '${filter_value}' in it`)
    }

    if(action.type === add_todo && action.todo.todoValue.toLowerCase().includes(filter_value) ){
        return alert(`You cant add this task with '${filter_value}' in it`)
    }
    return store.dispatch(action)
}