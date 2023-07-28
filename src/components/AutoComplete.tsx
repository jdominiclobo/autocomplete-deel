import React, { useState } from "react";
import { Option } from "../data/countries";

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type here..."
        onChange={handleInputChange}
      />
    </div>
  );
};
export default AutoComplete;
