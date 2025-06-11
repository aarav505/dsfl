import React from 'react';

const PlayerCard = ({ player, onSelect, isSelected, showSelectButton = true }) => {
  const getPositionClass = (position) => {
    switch (position.toUpperCase()) {
      case 'GK': return 'position-gk';
      case 'DEF': return 'position-def';
      case 'MID': return 'position-mid';
      case 'ATT': return 'position-att';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHouseClass = (house) => {
    switch (house.toLowerCase()) {
      case 'tata': return 'house-tata';
      case 'oberoi': return 'house-oberoi';
      case 'jaipur': return 'house-jaipur';
      case 'hyderabad': return 'house-hyderabad';
      case 'kashmir': return 'house-kashmir';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 card-hover ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{player.name}</h3>
        <div className="text-right">
          <div className="text-lg font-bold text-indigo-600">₹{player.price}</div>
          {player.is_captain && (
            <div className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-semibold mt-1">
              Captain
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <span className={`position-badge ${getPositionClass(player.position)}`}>
          {player.position}
        </span>
        <span className={`house-badge ${getHouseClass(player.house)}`}>
          {player.house}
        </span>
      </div>
      
      {showSelectButton && onSelect && (
        <button
          onClick={() => onSelect(player)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isSelected
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSelected ? 'Remove' : 'Select'}
        </button>
      )}
    </div>
  );
};

export default PlayerCard;