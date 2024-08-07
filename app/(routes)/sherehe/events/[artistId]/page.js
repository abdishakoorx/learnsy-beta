"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { artists } from '../../artistsData';

const platformIcons = {
  twitter: <FaTwitter className="text-2xl" />,
  instagram: <FaInstagram className="text-2xl" />,
  facebook: <FaFacebook className="text-2xl" />,
};

const ticketTypes = ['Regular', 'VIP', 'VVIP'];
const eventDates = ['2024-07-15', '2024-07-16', '2024-07-17'];

function EventInfoPage() {
  const params = useParams();
  const artistId = params.artistId;
  const artist = artists.find(a => a.id === parseInt(artistId));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTicketType, setSelectedTicketType] = useState('');

  if (!artist) return <div className="flex items-center justify-center min-h-screen">Artist not found</div>;

  const handleBookTicket = () => {
    if (selectedDate && selectedTicketType) {
      alert(`Booking confirmed for ${artist.name}\nDate: ${selectedDate}\nTicket Type: ${selectedTicketType}`);
      setIsDialogOpen(false);
    } else {
      alert('Please select both a date and a ticket type.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl p-8 mx-auto bg-white shadow-2xl bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl md:p-10 lg:p-12">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{artist.name}</h1>
        <div className="flex flex-col gap-8 md:flex-row">
          <img src={artist.image} alt={artist.name} className="object-cover w-full h-64 rounded-lg shadow-md md:w-1/3 md:h-auto" />
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Discography:</h2>
            <ul className="mb-6 space-y-2">
              {artist.discography.map((album, index) => (
                <li key={index} className="text-gray-600">{album}</li>
              ))}
            </ul>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Social Media:</h2>
            <ul className="flex mb-6 space-x-4">
              {Object.entries(artist.socialMediaLinks).map(([platform, link]) => (
                link && (
                  <li key={platform}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 transition duration-300 hover:text-indigo-800"
                    >
                      {platformIcons[platform]}
                    </a>
                  </li>
                )
              ))}
            </ul>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="px-6 py-3 font-bold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg"
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">Book Ticket for {artist.name}</h3>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold">Select Date:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {eventDates.map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 border rounded ${selectedDate === date ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Select Ticket Type:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {ticketTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedTicketType(type)}
                        className={`p-2 border rounded ${selectedTicketType === type ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleBookTicket}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Book Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventInfoPage;