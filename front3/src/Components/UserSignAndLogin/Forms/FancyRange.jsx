function FancyRange({ rangeValue, setRangeValue }) {
  return (
    <input
      type="range"
      value={rangeValue}
      min={0}
      max={100}
      step={1}
      style={{
        background: `linear-gradient(to right, #3498db ${
          rangeValue - (rangeValue > 50 ? 1 : 0)
        }%, #ddd  ${rangeValue}%)`,
      }}
      onChange={(e) => setRangeValue(+e.target.value)}
    ></input>
  );
}

export default FancyRange;
