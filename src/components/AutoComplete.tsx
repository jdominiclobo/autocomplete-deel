import React, { useEffect, useState } from "react";
import { countries as mockOptions, Option } from "../data/countries";

const fetchOptions = (): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOptions);
    }, 1000);
  });
};

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const fetchedOptions = await fetchOptions();
      setOptions(fetchedOptions);
    };
    loadOptions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter(
        (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option: Option): void => {
    setInputValue(option.name);
    setFilteredOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Type here..."
        onChange={handleInputChange}
      />
      {filteredOptions.length > 0 && (
        <ul>
          {filteredOptions.map((option) => (
            <li key={option.code} onClick={() => handleOptionClick(option)}>
              <span>{inputValue}</span>
              {option.name.slice(inputValue.length)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default AutoComplete;
