import { useRef } from "react";

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
  const characters = useRef(190);
  return (
    <>
      <div className="input-group descriptionForm">
        <div className="input-group-text descriptLabel">
          <span> Description </span>{" "}
          <span> Max Characters: {characters.current - value.length}</span>
        </div>
        <textarea
          maxLength={characters.current}
          className="form-control "
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
