export const Input = ({
  label,
  placeholder,
  handleChange,
  name,
  type,
  error,
  value,
  handleKeyDown,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="Fname" className="text-[14px] font-semibold ml-2">
        {label}
        <span className="text-red-700">*</span>
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className={`p-3 border-[2px] outline-none border-gray-500 rounded-[10px]`}
        onKeyDown={handleKeyDown}
      />
      <small className="text-sm ml-3 text-red-700 tracking-wider ">
        {error}
      </small>
    </div>
  );
};
