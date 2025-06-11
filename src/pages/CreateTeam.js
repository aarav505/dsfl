import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [captainId, setCaptainId] = useState('');
  const [formation, setFormation] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    position: '',
    house: ''
  });

  const navigate = useNavigate();
  const BUDGET = 100; // Total budget

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('/api/team/players');
      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch players');
      setLoading(false);
    }
  };

  const handlePlayerSelect = (player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captainId === player.id) {
        setCaptainId('');
      }
    } else {
      if (selectedPlayers.length >= 11) {
        alert('You can only select 11 players');
        return;
      }
      
      const totalCost = selectedPlayers.reduce((sum, p) => sum + p.price, 0) + player.price;
      if (totalCost > BUDGET) {
        alert('This selection exceeds your budget!');
        return;
      }
      
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    if (selectedPlayers.length !== 11) {
      alert('Please select exactly 11 players');
      return;
    }
    
    if (!captainId) {
      alert('Please select a captain');
      return;
    }
    
    setCreating(true);
    setError('');

    try {
      const teamData = {
        name: teamName,
        players: selectedPlayers.map(p => p.id),
        captain_id: parseInt(captainId),
        formation: formation
      };

      await axios.post('/api/team/create', teamData);
      navigate('/my-team');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create team');
    }
    
    setCreating(false);
  };

  const getTotalCost = () => {
    return selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  };

  const getRemainingBudget = () => {
    return BUDGET - getTotalCost();
  };

  const getFilteredPlayers = () => {
    return players.filter(player => {
      if (filters.position && player.position !== filters.position) return false;
      if (filters.house && player.house !== filters.house) return false;
      return true;
    });
  };

  const getPlayersByPosition = (position) => {
    return selectedPlayers.filter(player => player.position === position);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Team Builder */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your Team</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                value={filters.position}
                onChange={(e) => setFilters({...filters, position: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Positions</option>
                <option value="GK">Goalkeeper</option>
                <option value="DEF">Defender</option>
                <option value="MID">Midfielder</option>
                <option value="ATT">Attacker</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">House</label>
              <select
                value={filters.house}
                onChange={(e) => setFilters({...filters, house: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Houses</option>
                <option value="Tata">Tata</option>
                <option value="Oberoi">Oberoi</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kashmir">Kashmir</option>
              </select>
            </div>
          </div>
        </div>

        {/* Available Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getFilteredPlayers().map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSelect={handlePlayerSelect}
              isSelected={selectedPlayers.some(p => p.id === player.id)}
            />
          ))}
        </div>
      </div>

      {/* Team Summary */}
      <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-4">
        <h2 className="text-2xl font-semibold mb-4">Your Team</h2>
        
        {/* Budget */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Budget Used:</span>
            <span className="font-bold">₹{getTotalCost()}/₹{BUDGET}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(getTotalCost() / BUDGET) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Remaining: ₹{getRemainingBudget()}
          </div>
        </div>

        {/* Team Formation */}
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter team name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formation
            </label>
            <select
              value={formation}
              onChange={(e) => setFormation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Formation</option>
              <option value="4-4-2">4-4-2</option>
              <option value="4-3-3">4-3-3</option>
              <option value="3-5-2">3-5-2</option>
              <option value="5-3-2">5-3-2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Captain
            </label>
            <select
              value={captainId}
              onChange={(e) => setCaptainId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Captain</option>
              {selectedPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.position})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Players Summary */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Selected Players ({selectedPlayers.length}/11)</h3>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="font-semibold text-yellow-600">{getPlayersByPosition('GK').length}</div>
                <div className="text-xs">GK</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-semibold text-blue-600">{getPlayersByPosition('DEF').length}</div>
                <div className="text-xs">DEF</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-600">{getPlayersByPosition('MID').length}</div>
                <div className="text-xs">MID</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="font-semibold text-red-600">{getPlayersByPosition('ATT').length}</div>
                <div className="text-xs">ATT</div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={creating || selectedPlayers.length !== 11 || !teamName || !captainId}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? 'Creating Team...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;