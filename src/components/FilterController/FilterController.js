import FilterRadioInput from '../FilterRadioInput/FilterRadioInput';
import './FilterController.css';

function FilterController({handleFilterBtn, filter}) {
  return (
    <form className="filter-controller">
      <FilterRadioInput filter={filter} handleFilterBtn={handleFilterBtn} value={'all'} text={'Все'}/>
      <FilterRadioInput filter={filter} handleFilterBtn={handleFilterBtn} value={'done'} text={'Выполненные'}/>
      <FilterRadioInput filter={filter} handleFilterBtn={handleFilterBtn} value={'undone'} text={'Текущие'}/>
  </form>
  );
}

export default FilterController;
