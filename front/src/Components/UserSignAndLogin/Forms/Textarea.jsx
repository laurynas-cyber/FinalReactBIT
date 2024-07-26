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
      <div class="input-group">
        <span class="input-group-text">Description</span>
        <textarea class="form-control" aria-label="With textarea"></textarea>
      </div>
    </>
  );
}
