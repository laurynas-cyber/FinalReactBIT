export default function Select({
  onChange,
  value,
  name,
  options = [],
  errors = {},
}) {
  return (
    <>
      <select
        className={`form-select form-select-md ${errors[name] ? "error" : ""}`}
        onChange={onChange}
        value={value}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="error-text">
        <span className={errors[name] ? "show" : ""}>{errors[name] ?? ""}</span>
      </div>
    </>
  );
}
