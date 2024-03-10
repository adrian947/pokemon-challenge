interface PokemonType {
  type: string;
  id: number;
}

interface PokemonTypeSelectProps {
  options: PokemonType[];
  onSelectChange: (selectedType: string) => void;
  inputFilter: string;
  isDark?: boolean;
}

const Select: React.FC<PokemonTypeSelectProps> = ({
  options,
  onSelectChange,
  inputFilter,
  isDark,
}) => {
  return (
    <select
      value={inputFilter}
      onChange={(e) => onSelectChange(e.target.value)}
      className={!isDark ? 'bg-select' : ''}
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
