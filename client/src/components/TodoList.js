import { useRecoilValue } from 'recoil';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';
import { filteredTodoListState, loadTasks } from '../recoil/selectors'
import TodoListFilters from './TodoListFilters';
import TodoListStats from './TodoListStats';

function TodoList() {

  const taskList = useRecoilValue(loadTasks);

  return (
    <>
      <TodoItemCreator />
      <ul>
        {taskList.map((task) => {
          return (
            <li key={task._id}><p>{task.action} <input type="checkbox"/></p></li>
          )
        })}
      </ul>
    </>
  );
}

export default TodoList;