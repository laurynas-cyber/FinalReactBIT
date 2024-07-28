function Range(onChange, value, name, placeholder = null, autoComplete = null) {
  return (
    <>
      <label for="customRange2" className="form-label">
        Select the amount you want to collect
      </label>
      <input
        type="range"
        value="1"
        name={name}
        onChange={onChange}
        className="form-range"
        min="0"
        max="5"
        id="customRange2"
      />
    </>
  );
}

export default Range;
