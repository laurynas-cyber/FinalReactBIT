export default function Textarea({
  label = null,
  onChange,
  value,
  type,
  name,
  placeholder = null,
  autoComplete = null,
  errors = {},
}) {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Description</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
        ></textarea>
      </div>
    </>
  );
}
