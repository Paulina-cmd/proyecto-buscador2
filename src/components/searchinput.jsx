import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  return (
    <input
      type="text"
      placeholder="Buscar por nombre, perfil o intereses..."
      value={value}
      onChange={handleChange}
      style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto 2rem auto',
        display: 'block',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '1rem'
      }}
    />
  );
};

export default SearchInput;