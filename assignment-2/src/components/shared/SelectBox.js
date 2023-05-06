import shortid from "shortid";

const SelectBox = ({
  icon,
  label,
  id,
  name,
  data,
  isNotBorderRight,
  ...rest
}) => {
  return (
    <div className={`des-from ${isNotBorderRight ? "!border-r-0" : ""}`}>
      <p>{label}</p>
      <div className="flex flex-row">
        <img src={icon} alt="logo" />
        <select
          className="outline-none px-2 py-2 w-full"
          name={name}
          id={id}
          {...rest}
          required
        >
          <option value="" hidden>
            Please Select
          </option>
          {data.map((item) => (
            <option key={shortid.generate()} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
