'use client';
import React from 'react';

export function BookingGuide({ currentStep }) {
  const steps = [
    { number: 1, title: "Location", description: "Choose cinema" },
    { number: 2, title: "Movie", description: "Select movie" },
    { number: 3, title: "Info", description: "See details" },
    { number: 4, title: "Seats", description: "Choose seats" },
    { number: 5, title: "Snacks", description: "Add refreshments" },
    { number: 6, title: "Customer", description: "Enter details" },
    { number: 7, title: "Payment", description: "Complete booking" },
  ];

  return (
    <div className="w-full max-w-4xl px-4 mx-auto my-8">
      <div className="relative">
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
          <div style={{ width: `${(currentStep / steps.length) * 100}%` }} className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-primary"></div>
        </div>
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center ${
                currentStep >= step.number ? 'bg-primary text-white' : 'bg-white border-2 border-gray-200'
              }`}>
                <span>{step.number}</span>
              </div>
              <div className="mt-2 text-xs text-center">
                <span className="font-bold">{step.title}</span>
                <p className="hidden sm:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}