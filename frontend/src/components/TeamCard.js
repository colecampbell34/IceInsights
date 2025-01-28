import React from 'react';

const TeamCard = ({ team }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">{team.fullName}</h2>
      <p className="text-gray-600">
        First Season: {(team.firstSeasonId.toString()).slice(0, 4)} - {(team.firstSeasonId.toString()).slice(4, 8)}
      </p>
      {/* Other team details */}
    </div>
  );
};

export default TeamCard;