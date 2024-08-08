// SherehePage.js
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import EventCreationForm from './EventCreationForm';
import { Plus } from 'lucide-react';

// Define music event types
const eventTypes = [
  "Concerts", "Festivals", "Music Tours", "Recitals", "Open Mic Nights",
  "Battle of the Bands", "DJ Sets", "Operas", "Musicals",
  "Symphonies/Orchestral Concerts", "Jam Sessions", "Tribute Shows",
  "Charity Concerts", "Flash Mobs", "House Concerts"
];

function SherehePage() {
  const [showEventForm, setShowEventForm] = useState(false);

  const toggleEventForm = () => {
    setShowEventForm((prevState) => !prevState);
  };

  return (
    <div className="container p-10 px-10 mb-10 relative">
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Select Event Type:</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {eventTypes.map((type) => (
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
      <div className="absolute top-4 right-4">
        {showEventForm ? (
          <button
            className="bg-secondary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleEventForm}
          >
            X
          </button>
        ) : (
          <button
            className="bg-secondary flex gap-3 items-center hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleEventForm}
          >
            <Plus className='w-6 h-6' />
            Create Event
          </button>
        )}
      </div>
      {showEventForm && (
        <div className="absolute top-14 right-5 w-100% md:w-1/2 lg:w-1/3 h-[355px] bg-white border-accent border-2 rounded-l p-8 overflow-y-auto">
          <EventCreationForm />
        </div>
      )}
    </div>
  );
}

export default SherehePage;