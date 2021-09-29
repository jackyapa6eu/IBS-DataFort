import TodoItem from '../TodoItem/TodoItem';
import './ItemsList.css';


function ItemsList({todoItems, toggleDone, deleteItem}) {
  return (
    <ul className="items-list">
    {todoItems.map((item, index) => 
      <li className="items-list__item" key={index}>
        <TodoItem item={item} handleItemClick={toggleDone} deleteItem={deleteItem}/>
      </li>)}
  </ul>
  )
};

export default ItemsList;