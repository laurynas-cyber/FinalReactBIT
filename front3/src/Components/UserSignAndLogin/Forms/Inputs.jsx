function Inputs({
  onChange,
  value,
  type,
  name,
  placeholder = null,
  autoComplete = null,
  errors = {},
}) {
  return (
    <div className="form-floating">
      <input
        onChange={onChange}
        type={type}
        id={name}
        className={`form-control custom-input ${
          errors[name] ? "showBorder" : ""
        }`}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        value={value}
      ></input>
      <label
        htmlFor="name"
        className={`form-label custom-input ${errors[name] ? "show" : ""}`}
      >
        {errors[name] ? errors[name] : placeholder}
      </label>
    </div>
  );
}

export default Inputs;
