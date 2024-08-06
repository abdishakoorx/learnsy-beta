"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { events } from '../eventsData';

// ... (rest of the code remains the same)


function EventTypePage({ params }) {
    const { type } = params;
    const decodedType = decodeURIComponent(type.replace(/-/g, ' '));
    const capitalizedType = decodedType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const filteredEvents = events.filter(event => event.type === type);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const ticketTypes = [
        { name: 'VIP', price: 200 },
        { name: 'VVIP', price: 300 },
        { name: 'Front', price: 150 },
        { name: 'Regular', price: 100 }
    ];

    const handleBuyTicket = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleTicketSelection = (ticketType) => {
        alert(`You've selected a ${ticketType.name} ticket for ${selectedEvent.name} at $${ticketType.price}`);
        setShowModal(false);
        setSelectedEvent(null);
    };

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
                                <div className="flex justify-between">
                                    <Link href={`/sherehe/event/${event.id}`} className="text-blue-500 hover:text-blue-700">
                                        View Details
                                    </Link>
                                    <button
                                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                        onClick={() => handleBuyTicket(event)}
                                    >
                                        Buy Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No events found for this category.</p>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-8 bg-white rounded-lg">
                        <h2 className="mb-4 text-2xl font-bold">Select Ticket Type for {selectedEvent.name}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {ticketTypes.map((ticketType) => (
                                <button
                                    key={ticketType.name}
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    onClick={() => handleTicketSelection(ticketType)}
                                >
                                    {ticketType.name} - ${ticketType.price}
                                </button>
                            ))}
                        </div>
                        <button
                            className="px-4 py-2 mt-4 text-black bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventTypePage;