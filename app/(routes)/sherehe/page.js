import React from 'react';
import Link from 'next/link';

// Define music event types
const eventTypes = [
  "Concerts", "Festivals", "Music Tours", "Recitals", "Open Mic Nights",
  "Battle of the Bands", "DJ Sets", "Operas", "Musicals", 
  "Symphonies/Orchestral Concerts", "Jam Sessions", "Tribute Shows",
  "Charity Concerts", "Flash Mobs", "House Concerts"
];

function SherehePage() {
  return (
    <div className="container p-10 px-10">
      
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Select Event Type:</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {eventTypes.map(type => (
            <Link 
              key={type} 
              href={`/sherehe/${encodeURIComponent(type.toLowerCase().replace(/ /g, '-'))}`}
              className="p-4 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {type}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SherehePage;