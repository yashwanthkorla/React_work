/* Custom verification which is done before dispatching action to the reducer.
 *
 * if u want to use verification inbetween the dispatch and the reducer(pure functions/ the functions which changes the state based on aciton type)
 * u can make use of redux lirbary applymiddleware method. This should be passed as the second argument to the createstore.
 * This applymiddleware accepts n number of functions which does the verification or logging or other task before
 * sending it to the reducers. ex: Redux.applyMiddleware(...checkers)
 */

import { add_goal, add_todo } from "./constants.js";
const filter_value =
  "<Your filter value like a task or goal with stupid in the action value shouldnt dispatch>";
export default function checkAndDispatch(store, action) {
  if (
    action.type === add_goal &&
    action.goal.goalValue.toLowerCase().includes(filter_value)
  ) {
    return alert(`You cant add this goal with '${filter_value}' in it`);
  }

  if (
    action.type === add_todo &&
    action.todo.todoValue.toLowerCase().includes(filter_value)
  ) {
    return alert(`You cant add this task with '${filter_value}' in it`);
  }
  return store.dispatch(action);
}
