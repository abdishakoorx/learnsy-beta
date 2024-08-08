"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { events } from '../eventsData';

function EventTypePage({ params }) {
    const { type } = params;
    const decodedType = decodeURIComponent(type.replace(/-/g, ' '));
    const capitalizedType = decodedType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const filteredEvents = events.filter(event => event.type.toLowerCase().replace(/ /g, '-') === type);

    return (
        <div className="container px-4 py-8 mx-auto">
            <Link href="/sherehe" className="inline-block mb-4 text-blue-500 hover:text-blue-700">
                &larr; Back to Event Types
            </Link>
            <h1 className="mb-6 text-3xl font-bold">{capitalizedType}</h1>
            {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-semibold">{event.name}</h3>
                                <p className="mb-4 text-gray-600">{event.description}</p>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Date: {event.date}</p>
                                    <p className="text-sm text-gray-500">Venue: {event.venue}</p>
                                    <p className="text-sm font-semibold text-green-600">Starting from: ${event.price}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                    >
                                        <Link href={`/sherehe/event/${event.id}`}>
                                            View Details
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No events found for this category.</p>
            )}
        </div>
    );
}

export default EventTypePage;