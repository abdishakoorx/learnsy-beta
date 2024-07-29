'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingGuide } from './_components/BookingGuide';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';

function CinemaCard({ cinema, onSelect }) {
  return (
    <div
      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl"
      onClick={() => onSelect(cinema)}
    >
      <div className="relative w-full h-48">
        <Image
          src={cinema.icon.url}
          alt={cinema.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{cinema.name}</h3>
        <p className="mb-2 text-gray-600">{cinema.location}</p>
        <div className="flex items-center">
          <span className="mr-2 text-yellow-500">★</span>
          <span>{cinema.rating}</span>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-48 bg-gray-300 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex items-center">
          <span className="mr-2 text-yellow-500">★</span>
          <div className="w-10 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function MoviePage() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetCinemas();
  }, []);

  const GetCinemas = () => {
    setIsLoading(true);
    GlobalApi.GetCinemas().then((resp) => {
      setCinemas(resp.cinemas);
      setIsLoading(false);
    });
  };

  const handleCinemaSelect = (cinema) => {
    router.push(`/movies/select?cinema=${encodeURIComponent(cinema.name)}&id=${cinema.id}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <BookingGuide currentStep={1} />
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Select a Cinema</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array(6).fill().map((_, index) => <SkeletonCard key={index} />)
          : cinemas.map((cinema) => (
              <CinemaCard
                key={cinema.id}
                cinema={cinema}
                onSelect={handleCinemaSelect}
              />
            ))
        }
      </div>
    </div>
  );
}

export default MoviePage;