const SelectCategoryOrSubcategory = ({ register, items, name }) => {
  return (
    <select
      id={name}
      {...register(name)}
      className="input "
      aria-describedby={`${name}-error`}
    >
      <option
        value=""
        disabled
        selected
      >{`Select ${name}`}</option>
      {items?.map((name) => (
        <option key={name._id} value={name._id}>
          {name.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategoryOrSubcategory;