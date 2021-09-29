import classNames from 'classnames';
import './TextForm.css';

function TextForm({addTodoItem, todoInputValue, handleTodoInput, isFormValid, showError}) {
  const errorSelectors = classNames('text-form__error-msg', 
    {
      'text-form__error-msg_active': showError
    }
  )
  return (
    <form className="text-form" onSubmit={addTodoItem} noValidate>
      <input className="text-form__text-input" type="text" placeholder="введите текст" value={todoInputValue || ''} onChange={handleTodoInput}/>
      <button className="text-form__submit-btn" type="submit" disabled={!isFormValid}>Добавить</button>
      <p className={errorSelectors}>Превышено максимальное количество символов.</p>
  </form>
  );
}

export default TextForm;
