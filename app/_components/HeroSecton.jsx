import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function HeroSection() {
  return (
    <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">Don't stop</h1>
          <h1 className="text-3xl font-extrabold sm:text-5xl text-secondary">Having fun</h1>
          <p className="mt-3 mb-8 text-xl text-white md:text-2xl">
            Book Events, Sports, Concerts, and Movies with Ease
          </p>
          <Button className="px-8 py-3 font-bold transition duration-300 rounded-lg text-primary bg-accent hover:bg-accent">
            <Link href={'/movies'}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
