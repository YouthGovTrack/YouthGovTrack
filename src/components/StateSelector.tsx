import React, { useState } from 'react';
import { nigeriaStates, State } from '../data/nigeriaData';

interface StateSelectorProps {
  onStateChange?: (state: string) => void;
  onLgaChange?: (lga: string) => void;
  className?: string;
}

const StateSelector: React.FC<StateSelectorProps> = ({ 
  onStateChange, 
  onLgaChange, 
  className = "" 
}) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLga, setSelectedLga] = useState<string>('');
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setSelectedLga(''); // Reset LGA when state changes
    
    // Find the selected state and get its LGAs
    const state = nigeriaStates.find(s => s.name === stateName);
    if (state) {
      setAvailableLgas(state.lgas);
    } else {
      setAvailableLgas([]);
    }
    
    // Call parent callback
    if (onStateChange) {
      onStateChange(stateName);
    }
  };

  const handleLgaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lgaName = event.target.value;
    setSelectedLga(lgaName);
    
    // Call parent callback
    if (onLgaChange) {
      onLgaChange(lgaName);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* State Selector */}
      <div>
        <select 
          className="w-full p-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select your state</option>
          {nigeriaStates.map((state) => (
            <option key={state.code} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* LGA Selector */}
      <div>
        <select 
          className="w-full p-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={selectedLga}
          onChange={handleLgaChange}
          disabled={!selectedState || availableLgas.length === 0}
        >
          <option value="">
            {selectedState ? 'Select your LGA' : 'Select a state first'}
          </option>
          {availableLgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateSelector;
