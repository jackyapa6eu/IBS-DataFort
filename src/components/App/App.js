import './App.css';
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../utils/firebaseConfig';
import { getDatabase, ref, set, onValue } from "firebase/database";
import TextForm from '../TextForm/TextForm';
import MaxLengthController from '../MaxLengthController/MaxLengthController';
import Progress from '../Progress/Progress';
import FilterController from '../FilterController/FilterController';
import ItemsList from '../ItemsList/ItemsList';

initializeApp(firebaseConfig);

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState('');
  const [doneItems, setDoneItems] = useState(doneItemsCounter());
  const [isFormValid, setIsFormValid] = useState(false);
  const [filter, setFilter] = useState('all');
  const [maxItemLength, setMaxItemLength] = useState(1);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    getTodoItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputValidator();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoInputValue, maxItemLength])

  useEffect(() => {
    setDoneItems(doneItemsCounter());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoItems])

  function inputValidator() {
    const length = todoInputValue.length;
    const result = length > 0 && length <= maxItemLength ? true : false;
    if (length > maxItemLength) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    setIsFormValid(result);
  }

  function getTodoItems() {
    const db = getDatabase();
    const todoItemsRef = ref(db, 'todolist/');
    onValue(todoItemsRef, (snapshot) => {
      const items = snapshot.val();
      if (items) {
        setTodoItems(items);
      }
    });
  }
  
  function addTodoItem(event) {
    event.preventDefault();
    const newItem = {
      text: todoInputValue,
      done: false,
      id: Date.now()
    }
    let newTodoList = todoItems;
    newTodoList.push(newItem);
    sendUpdatedList(newTodoList);
    setTodoInputValue('');
  }
 
  function handleTodoInput(event) {
    setTodoInputValue(event.target.value);
  }

  function toggleDone(item) {
    const updatedTodoList = todoItems.map(el => {
      if (el.id === item.id) {
        el.done = !el.done;
      }
      return el
    });
    setTodoItems(updatedTodoList);
    sendUpdatedList(updatedTodoList);
  }

  function handleFilterBtn(event) {
    setFilter(event.currentTarget.value);
  }

  function filterTodoItems(arr) {
    let resultArr = [];
    if (filter === 'done') {
      resultArr = arr.filter((elem) => elem.done === true)
    } else if (filter === 'undone') {
      resultArr = arr.filter((elem) => elem.done === false);
    } else {
      resultArr = arr;
    }
    return resultArr;
  }

  function deleteItem(itemForDelete) {
    const newTodoList = todoItems.filter((el) => el.id !== itemForDelete.id);
    setTodoItems(newTodoList);
    sendUpdatedList(newTodoList);
  }

  function doneItemsCounter() {
    let doneItemsCount = 0;
    todoItems.forEach(item => {
      if (item.done) {
        doneItemsCount++;
      }
    });
    return doneItemsCount;
  }

  function sendUpdatedList(updatedList) {
    const db = getDatabase();
    set(ref(db, 'todolist'), updatedList);
  }

  function handleChangeMaxLegth(event) {
    setMaxItemLength(event.target.value);
  }

  return (
    <div className="App">
      <div className="main-container">
        <h1 className="title">TODO List</h1>
        <TextForm 
          addTodoItem={addTodoItem} 
          todoInputValue={todoInputValue} 
          handleTodoInput={handleTodoInput} 
          isFormValid={isFormValid} 
          showError={showError}
        />
        <MaxLengthController maxItemLength={maxItemLength} handleChangeMaxLegth={handleChangeMaxLegth}/>
        <Progress doneItems={doneItems} todoItems={todoItems}/>
        <FilterController filter={filter} handleFilterBtn={handleFilterBtn}/>
        <ItemsList todoItems={filterTodoItems(todoItems)} toggleDone={toggleDone} deleteItem={deleteItem}/>
      </div>
    </div>
  );
}

export default App;
