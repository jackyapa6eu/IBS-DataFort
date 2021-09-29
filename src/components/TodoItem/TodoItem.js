import './TodoItem.css';
import classNames from 'classnames';

function TodoItem({item, handleItemClick, deleteItem}) {
  function handleToggleClick() {
    handleItemClick(item);
  }
  function handleDeleteBtn() {
    deleteItem(item);
  }

  const todoItemSelectors = classNames('todo-item', {
    'todo-item_done': item.done
  })
  return (
    <div className={todoItemSelectors}>
      <h4 className="todo-item__name" onClick={handleToggleClick}>{item.text}</h4>
      <button className="todo-item__delete-btn" type="button" onClick={handleDeleteBtn}/>
    </div>
  );
}

export default TodoItem;
