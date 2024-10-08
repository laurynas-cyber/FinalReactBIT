import { useRef } from "react";

export default function Textarea({
  label = null,
  onChange,
  value = null,
  type,
  name,
  maxChar,
  title = "Description",
  placeholder = null,
  autoComplete = null,
  errors = {},
}) {
  const characters = useRef(maxChar);
  return (
    <>
      <div className="input-group descriptionForm">
        <div className="input-group-text descriptLabel">
          <span> {title} </span>{" "}
          <span> Max Characters: {characters.current - value.length}</span>
        </div>
        <textarea
          maxLength={characters.current}
          className="form-control custom-area"
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
