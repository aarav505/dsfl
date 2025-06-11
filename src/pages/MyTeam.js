import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import { Link } from 'react-router-dom';

const MyTeam = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyTeam();
  }, []);

  const fetchMyTeam = async () => {
    try {
      const response = await axios.get('/api/team/my_team');
      setTeam(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('No team found. Create your team first!');
      } else {
        setError('Failed to fetch your team');
      }
      setLoading(false);
    }
  };

  const getTotalValue = () => {
    if (!team?.players) return 0;
    return team.players.reduce((total, player) => total + player.price, 0);
  };

  const getPlayersByPosition = (position) => {
    if (!team?.players) return [];
    return team.players.filter(player => player.position === position);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <Link
          to="/create-team"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create Your Team
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{team.name}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span>Formation: {team.formation || 'Not set'}</span>
          <span>•</span>
          <span>Total Value: ₹{getTotalValue()}</span>
          <span>•</span>
          <span>Players: {team.players?.length || 0}</span>
        </div>
      </div>

      {/* Captain */}
      {team.captain && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Captain</h2>
          <div className="max-w-sm">
            <PlayerCard player={team.captain} showSelectButton={false} />
          </div>
        </div>
      )}

      {/* Team by Position */}
      <div className="space-y-8">
        {['GK', 'DEF', 'MID', 'ATT'].map(position => {
          const positionPlayers = getPlayersByPosition(position);
          const positionName = {
            'GK': 'Goalkeepers',
            'DEF': 'Defenders', 
            'MID': 'Midfielders',
            'ATT': 'Attackers'
          }[position];

          if (positionPlayers.length === 0) return null;

          return (
            <div key={position}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {positionName} ({positionPlayers.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {positionPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    showSelectButton={false}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Stats */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Team Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {getPlayersByPosition('GK').length}
            </div>
            <div className="text-sm text-gray-600">Goalkeepers</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {getPlayersByPosition('DEF').length}
            </div>
            <div className="text-sm text-gray-600">Defenders</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {getPlayersByPosition('MID').length}
            </div>
            <div className="text-sm text-gray-600">Midfielders</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {getPlayersByPosition('ATT').length}
            </div>
            <div className="text-sm text-gray-600">Attackers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;