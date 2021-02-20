import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../recoil/atoms';
import axios from 'axios';

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = (e) => {
    e.preventDefault();
    // setTodoList((oldTodoList) => [
    //   ...oldTodoList,
    //   {
    //     id: getId(),
    //     text: inputValue,
    //     isComplete: false,
    //   },
    // ]);

    const task = { action: inputValue };

    if (task.action && task.action.length > 0) {
      axios.post('/api/todos', task)
        // .then(res => {
        //   if(res.data){
        //     this.props.getTodos();
        //     this.setState({ action: "" })
        //   }
        // })
        .catch(err => console.log(err))
    }else {
      alert('input field required')
    }

    setInputValue('');
  }


  const handleChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <form onSubmit={addItem}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

// utility for creating unique Id
// let id = 0;
// function getId() {
//   return id++;
// }

export default TodoItemCreator;