"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { sportsData } from './_components/sportsData';
import { leaguesData } from './_components/leaguesData';
import { teamsData } from './_components/teamsData';

const SportsPage = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const handleSportSelect = (sportId) => {
    setSelectedSport(sportId);
    setSelectedLeague(null);
  };

  const handleLeagueSelect = (leagueId) => {
    setSelectedLeague(leagueId);
  };

  const renderSports = () => (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {sportsData.map((sport) => (
        <div 
          key={sport.id}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-md cursor-pointer hover:scale-105"
          onClick={() => handleSportSelect(sport.id)}
        >
          <div className="relative h-48">
            <Image
              src={`/${sport.image}`} 
              alt={sport.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 bg-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">{sport.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeagues = () => (
    <div className="p-6">
      <button 
        onClick={() => setSelectedSport(null)}
        className="px-4 py-2 mb-6 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back to Sports
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {leaguesData[selectedSport]?.map((league) => (
          <div
            key={league.id}
            className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
            onClick={() => handleLeagueSelect(league.id)}
          >
            <h4 className="text-lg font-semibold">{league.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="p-6">
      <button 
        onClick={() => setSelectedLeague(null)}
        className="px-4 py-2 mb-6 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back to Leagues
      </button>
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Team Name</th>
              <th className="px-4 py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {teamsData[selectedLeague]?.map((team, index) => (
              <tr key={team.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{team.name}</td>
                <td className="px-4 py-2">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 mx-auto max-w-7xl">
        {/* <h1 className="mb-8 text-3xl font-bold text-center">Sports in Kenya</h1> */}
        
        {!selectedSport && renderSports()}
        {selectedSport && !selectedLeague && renderLeagues()}
        {selectedLeague && renderTeams()}
      </div>
    </div>
  );
};

export default SportsPage;