import React, { useState } from 'react';

interface PokemonType {
  type: string;
  id: number;
}

interface PokemonTypeSelectProps {
  options: PokemonType[];
  onSelectChange: (selectedType: string) => void;
  inputFilter: string;
}

const Select: React.FC<PokemonTypeSelectProps> = ({
  options,
  onSelectChange,
  inputFilter,
}) => {
  return (
    <select
      value={inputFilter}
      onChange={(e) => onSelectChange(e.target.value)}
    >
      <option value='' disabled>
        type...
      </option>
      {options.map((type) => (
        <option key={type.id} value={type.type}>
          {type.type}
        </option>
      ))}
    </select>
  );
};

export default Select;
