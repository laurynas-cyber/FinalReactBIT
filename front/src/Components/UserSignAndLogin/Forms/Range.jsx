function Range({ onChange, value }) {
  return (
    <>
      <div className="rangeInfo">
        <label htmlFor="customRange2" className="form-label">
          Select amount you want to collect
        </label>
        <span>{value}000</span>
      </div>

      <input
        type="range"
        value={value}
        name="amount"
        className="form-range"
        min={1}
        max={10}
        onChange={onChange}
        id="customRange2"
      />
    </>
  );
}

export default Range;
