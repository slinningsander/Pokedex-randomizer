import { ChangeEvent } from 'react';
import './FilterComponent.css';

interface FilterComponentProps {
  selectedValue: string;
  onFilterChange: (value: string) => void;
  types: string[];
}

export function FilerComponent({ selectedValue, onFilterChange, types }: FilterComponentProps) {
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onFilterChange(newValue);
  };
  return (
    <div className="select-wrapper">
      <select value={selectedValue} onChange={handleFilterChange}>
        <option value="all">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize the first letter */}
          </option>
        ))}
      </select>
    </div>
  );
}
