import './Progress.css';

function Progress({doneItems, todoItems}) {
  const progressDoneStyles = {
    width: `${doneItems * 100 / todoItems.length}%`
  }
  return (
    <div className="progress">
      <div className="progress__done" style={progressDoneStyles}/>
      <p className="progress__text">{`выполненно ${doneItems} из ${todoItems.length}`}</p>
    </div>
  );
}

export default Progress;
