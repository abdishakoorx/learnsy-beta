import React from 'react';
import Link from 'next/link';

const eventTypes = [
  "Concerts", "Festivals", "Music Tours", "Recitals", "Open Mic Nights",
  "Battle of the Bands", "DJ Sets", "Operas", "Musicals",
  "Symphonies/Orchestral Concerts", "Jam Sessions", "Tribute Shows",
  "Charity Concerts", "Flash Mobs", "House Concerts"
];

function SherehePage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-900">
          Sherehe Events
        </h1>
        <div className="p-6 bg-white rounded-lg shadow-xl md:p-8 lg:p-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Select Event Type:</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventTypes.map((type, index) => (
              <Link 
                key={index} 
                href={`/sherehe/artists/${index + 1}`}
                className="block p-4 text-center transition duration-300 ease-in-out transform border border-gray-200 rounded-lg hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
              >
                <span className="text-lg font-medium text-gray-700 hover:text-indigo-600">
                  {type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SherehePage;