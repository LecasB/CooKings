const SelectCategories = ({ array1, onSelect }) => {
  const addtoother = (event) => {
    onSelect(event.target.value);
  };

  return (
    <select name="Categories" onChange={addtoother}>
      <option value="" selected disabled hidden>
        Choose here
      </option>
      {array1.map((ops, index) => (
        <option key={index} value={ops}>
          {ops}
        </option>
      ))}
    </select>
  );
};

export default SelectCategories;
