import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="exchange-buttons">
      <input 
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button>Aktif</button>
    </div>
  );
};

export default Search;
