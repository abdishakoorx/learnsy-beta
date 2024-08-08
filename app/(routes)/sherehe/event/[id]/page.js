"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '../../eventsData';
import { artists } from '../../artistsData';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function EventDetailPage({ params }) {
    const { id } = params;
    const event = events.find(e => e.id === parseInt(id));
    const eventArtists = artists.filter(artist => artist.eventId === parseInt(id));

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

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <Link href="/sherehe" className="inline-block mb-4 text-blue-500 hover:text-blue-700">
                &larr; Back to Events
            </Link>
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="relative w-full h-80">
                    <Image
                        src={'/concert.jpg'}
                        layout="fill"
                        objectFit="cover"
                        alt='Event Image'
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-8">
                    <h1 className="mb-4 text-3xl font-bold">{event.name}</h1>
                    <p className="mb-6 text-gray-600">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Event Details</h2>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                            <p><strong>Type:</strong> {event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
                        </div>
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Ticket Information</h2>
                            <p><strong>Starting Price:</strong> ${event.price}</p>
                            <p><strong>Available Tickets:</strong> 500</p>
                        </div>
                    </div>
                    <div className="p-4 mb-6 bg-gray-100 rounded-lg">
                        <h2 className="mb-2 text-xl font-semibold">About the Event</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <button
                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={() => handleBuyTicket(event)}
                    >
                        Buy Ticket
                    </button>
                </div>
            </div>

            {/* Artists Section */}
            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Artists Performing</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {eventArtists.map(artist => (
                        <Link key={artist.id} href={`/sherehe/event/${id}/artist/${artist.id}`}>
                            <div className="flex items-center overflow-hidden bg-white rounded-lg shadow-md cursor-pointer p-4">
                                <div className="relative w-16 h-16 mr-4">
                                    <Image
                                        src={artist.image}
                                        layout="fill"
                                        objectFit="cover"
                                        alt={artist.name}
                                        className="rounded-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

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

export default EventDetailPage;
