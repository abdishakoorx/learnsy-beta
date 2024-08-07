"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { artists } from '../../artistsData';

function ArtistsPage() {
  const params = useParams();
  const eventId = params.eventId;
  const eventArtists = artists.filter(artist => artist.eventId === parseInt(eventId));

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-900 animate-fade-in-down">
          Artists for this Event
        </h1>
        <div className="p-8 bg-white shadow-2xl bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl md:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventArtists.map(artist => (
              <Link 
                key={artist.id} 
                href={`/sherehe/events/${artist.id}`}
                className="block overflow-hidden transition duration-300 ease-in-out transform shadow-md group rounded-xl hover:scale-105 hover:shadow-xl"
              >
                <div className="relative pb-2/3">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="absolute object-cover w-full h-full transition duration-300 group-hover:opacity-75"
                  />
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-gray-50 group-hover:from-blue-50 group-hover:to-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-800 transition duration-300 group-hover:text-indigo-600">{artist.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistsPage;