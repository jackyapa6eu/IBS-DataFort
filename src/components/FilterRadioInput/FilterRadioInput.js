import './FilterRadioInput.css';
import classNames from "classnames";


function FilterRadioInput({filter, handleFilterBtn, value, text}) {
  const isChecked = filter === value;
  const filterControllerLabelSelectors = classNames('filter-controller__label', {
    'filter-controller__label_active': isChecked
  })
  return (
    <>
      <input 
        type="radio" 
        name='filter' 
        value={value} 
        id={`filter-${value}`}
        onChange={handleFilterBtn} 
        checked={isChecked}
        className="filter-controller__input"
      />
      <label htmlFor={`filter-${value}`} className={filterControllerLabelSelectors}>{text}</label>
  </>
  )
}

export default FilterRadioInput;