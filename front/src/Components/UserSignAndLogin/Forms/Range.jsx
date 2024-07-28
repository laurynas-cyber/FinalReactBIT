function Range(onChange, value) {
  return (
    <>
      <label htmlFor="customRange2" className="form-label">
        Select the amount you want to collect
      </label>
      <input
        onChange={onChange}
        type="range"
        value={value}
        name="range"
        className="form-range"
        min={1}
        max={10}
        id="customRange2"
      />
    </>
  );
}

export default Range;
