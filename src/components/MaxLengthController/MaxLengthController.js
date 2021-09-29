import './MaxLengthController.css';

function MaxLengthController({maxItemLength, handleChangeMaxLegth}) {
  const thumbPosition = {
    left: `calc(${calcThumbPosition()}%)`
  };

  function calcThumbPosition() {
    return Number(maxItemLength) === 1 ? 0 : (maxItemLength - 1) * 100 / 30;
  }

  return (
    <div className="max-length-controller">
      <p className="max-length-controller__label">Максимальное количество символов: {maxItemLength}</p>
      <div className="max-length-controller__scrollbar">
        <input 
          className="max-length-controller__input"
          type="range" 
          id="max-item-length" 
          name="max-item-length" 
          min={1} 
          max={30} 
          step={1} 
          value={maxItemLength}
          onChange={handleChangeMaxLegth}
        />
        <div className="max-length-controller__scrollbar-track"/>
        <div className="max-length-controller__scrollbar-thumb" style={thumbPosition}/>
      </div>

    </div>
  );
}

export default MaxLengthController;
