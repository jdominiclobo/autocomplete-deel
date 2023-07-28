import React from "react";

const AutoComplete: React.FC = () => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "clicked");
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
