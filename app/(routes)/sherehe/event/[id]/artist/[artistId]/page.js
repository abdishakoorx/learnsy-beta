"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYahoo, FaYoutube } from 'react-icons/fa';
import { artists } from '@/app/(routes)/sherehe/artistsData';
import Image from 'next/image';
import Link from 'next/link';

const ArtistDetailPage = () => {
  const params = useParams();
  const { artistId } = params;
  const artist = artists.find(a => a.id === parseInt(artistId));

  if (!artist) {
    return <div className="flex items-center justify-center min-h-screen text-2xl text-red-600">Artist not found</div>;
  }

  const { name, image, discography, socialMediaLinks } = artist;

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link href="/sherehe" className="inline-block mb-4 text-blue-500 hover:text-blue-700">
        &larr; Back to Event Types
      </Link>
      <div className="flex items-center justify-center  ">
        <div className="flex flex-col max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg md:flex-row">
          <div className="relative w-full h-64 mb-6 md:mb-0 md:w-1/3 md:h-auto">
            <Image height={200} width={200} src={image} alt={name} className="object-cover w-full h-full rounded-lg" />
          </div>
          <div className="flex flex-col justify-center w-full p-4 md:w-2/3 md:pl-8">
            <h1 className="mb-4 text-4xl font-bold text-white">{name}</h1>
            <h2 className="mb-2 text-2xl font-semibold text-gray-300 mt-3">Discography</h2>
            <ul className="mb-6 text-gray-400 list-disc list-inside">
              {discography.map((album, index) => (
                <li key={index} className="text-lg">{album}</li>
              ))}
            </ul>
            <div className="flex space-x-4 mt-8">
              {socialMediaLinks.twitter && (
                <a href={socialMediaLinks.twitter} target="_blank" rel="noreferrer" className="text-3xl text-blue-500 transition duration-300 transform hover:scale-110 hover:text-blue-300">
                  <FaTwitter />
                </a>
              )}
              {socialMediaLinks.instagram && (
                <a href={socialMediaLinks.instagram} target="_blank" rel="noreferrer" className="text-3xl text-pink-500 transition duration-300 transform hover:scale-110 hover:text-pink-300">
                  <FaInstagram />
                </a>
              )}
              {socialMediaLinks.facebook && (
                <a href={socialMediaLinks.facebook} target="_blank" rel="noreferrer" className="text-3xl text-white transition duration-300 transform hover:scale-110 hover:text-white">
                  <FaFacebook />
                </a>
              )}
              {socialMediaLinks.youtube && (
                <a href={socialMediaLinks.youtube} target="_blank" rel="noreferrer" className="text-3xl text-red-700 transition duration-300 transform hover:scale-110 hover:text-red-700">
                  <FaYoutube />
                </a>
              )}
              {socialMediaLinks.tiktok && (
                <a href={socialMediaLinks.tiktok} target="_blank" rel="noreferrer" className="text-3xl text-black transition duration-300 transform hover:scale-110 hover:text-black">
                  <FaTiktok />
                </a>
              )}
              {socialMediaLinks.email && (
                <a href={socialMediaLinks.email} target="_blank" rel="noreferrer" className="text-3xl text-purple-800 transition duration-300 transform hover:scale-110 hover:text-purple-800">
                  <FaYahoo />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
