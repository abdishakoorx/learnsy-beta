"use client"
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { meetupsData } from './_components/MeetupData';
import Link from 'next/link';
import Image from 'next/image';

// Extract unique types from meetupsData
const types = ["All", ...new Set(meetupsData.map(meetup => meetup.type))].sort();

const Meetups = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // new price filter

  // Filter meetups based on all criteria
  const filteredMeetups = meetupsData.filter(meetup => {
    const matchesType = selectedType === "All" || meetup.type === selectedType;
    const matchesSearch = meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "all" ? true :
      priceFilter === "under50" ? meetup.price < 50 :
        priceFilter === "50to100" ? meetup.price >= 50 && meetup.price <= 100 :
          priceFilter === "100plus" ? meetup.price > 100 : true;

    return matchesType && matchesSearch && matchesPrice;
  });

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Discover Meetups</h1>
        <p className="mb-6 text-gray-600">Find and book tickets for exciting meetups, conventions, and exclusive events</p>

        {/* Enhanced Filter Section */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="text"
                placeholder="Search meetups..."
                className="w-full py-2 pl-10 pr-4 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Type Select */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg appearance-none"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute w-5 h-5 text-gray-400 pointer-events-none right-3 top-3" />
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg appearance-none"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="100plus">$100+</option>
              </select>
              <Filter className="absolute w-5 h-5 text-gray-400 pointer-events-none right-3 top-3" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredMeetups.length} events
        </div>
      </div>

      {/* Meetups Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeetups.map(meetup => (
          <Card key={meetup.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <div className="relative">
              <Image
                height={500}
                width={500}
                src={`/${meetup.image}`} 
                alt={meetup.title}
                className="object-cover w-full h-48"
              />
              <span className="absolute px-3 py-1 text-sm text-white bg-blue-600 rounded-full top-4 right-4">
                {meetup.type}
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{meetup.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">{meetup.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{meetup.date} at {meetup.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{meetup.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{meetup.availableSeats} seats available</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xl font-bold">${meetup.price.toFixed(2)}</span>
              <Link
                href={`/meetups/${meetup.id}`}
                className="px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Book Now
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Meetups;