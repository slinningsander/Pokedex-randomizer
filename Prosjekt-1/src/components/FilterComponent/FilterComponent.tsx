import { ChangeEvent } from 'react';
import './FilterComponent.css';

interface FilterComponentProps {
  selectedValue: string;
  onFilterChange: (value: string) => void;
}

export function FilerComponent({ selectedValue, onFilterChange }: FilterComponentProps) {
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onFilterChange(newValue);
  };
  return (
    <div className="select-wrapper">
      <select value={selectedValue} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="electric">Electric</option>
        <option value="ground">Ground</option>
        <option value="dragon">Dragon</option>
        <option value="psychic">Psychic</option>
        <option value="flying">Flying</option>
        <option value="fighting">Fighting</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="ice">Ice</option>
        <option value="fairy">Fairy</option>
      </select>
    </div>
  );
}
