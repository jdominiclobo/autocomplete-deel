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
