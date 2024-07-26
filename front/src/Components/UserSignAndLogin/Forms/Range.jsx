function Range() {
  return (
    <>
      <label for="customRange2" className="form-label">
        Select the amount you want to collect
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        id="customRange2"
      />
    </>
  );
}

export default Range;
