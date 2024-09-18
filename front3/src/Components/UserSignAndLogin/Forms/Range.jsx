function Range({ onChange, value }) {
  console.log(value);
  return (
    <>
      <div className="rangeInfo">
        <label htmlFor="customRange2" className="form-label">
          Select amount you want to collect
        </label>
        <span>{value}000eur</span>
      </div>

      <input
        type="range"
        value={value}
        name="amount"
        min={1}
        max={10}
        onChange={onChange}
        id="customRange2"
        style={{
          background: `linear-gradient(to right, #3498db ${
            parseInt(value) * 10 - (parseInt(value) === 1 ? 10 : 5)
          }%, #ddd  ${parseInt(value) * 10 - (parseInt(value) < 5 ? 10 : 1)}%)`,
        }}
      />
    </>
  );
}

export default Range;
