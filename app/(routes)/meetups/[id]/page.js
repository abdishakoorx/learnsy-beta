"use client"
import { useParams } from 'next/navigation'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { meetupsData } from '../_components/MeetupData'
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export default function MeetupDetails() {
  const { id } = useParams()
  const meetup = meetupsData.find(item => item.id === Number(id))
  const [selectedSeats, setSelectedSeats] = useState({
    regular: 0,
    vip: 0,
    premium: 0
  })
  const [open, setOpen] = useState(false)

  const seatPrices = {
    regular: meetup?.price || 0,
    vip: (meetup?.price || 0) + 50,
    premium: (meetup?.price || 0) + 100
  }

  const handleSeatChange = (type, value) => {
    const numericValue = Math.max(0, parseInt(value) || 0)
    setSelectedSeats(prev => ({
      ...prev,
      [type]: numericValue
    }))
  }

  const calculateTotal = () => {
    return Object.entries(selectedSeats).reduce(
      (total, [type, quantity]) => total + (seatPrices[type] * quantity),
      0
    )
  }

  const handleBooking = () => {
    const totalSeats = Object.values(selectedSeats).reduce((a, b) => a + b, 0)
    if (totalSeats === 0) {
      alert('Please select at least one seat')
      return
    }

    const bookingSummary = Object.entries(selectedSeats)
      .filter(([_, qty]) => qty > 0)
      .map(([type, qty]) => `${qty} ${type} seat(s)`)
      .join('\n')

    alert(`Booking confirmed!\n\n${bookingSummary}\n\nTotal: $${calculateTotal().toFixed(2)}`)
    setOpen(false)
    setSelectedSeats({ regular: 0, vip: 0, premium: 0 })
  }

  if (!meetup) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-bold">Meetup not found</h2>
        <Link href="/meetups">
          <Button>Back to Meetups</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <Link href="/meetups" className="inline-block mb-6">
          <Button variant="outline">← Back to All Meetups</Button>
        </Link>

        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <Image
            height={500}
            width={500}
            src={`/${meetup.image}`}
            alt={meetup.title}
            className="object-cover w-full h-80"
          />

          <div className="p-8">
            <span className="inline-block px-3 py-1 mb-4 text-sm text-white bg-blue-600 rounded-full">
              {meetup.type}
            </span>

            <h1 className="mb-4 text-3xl font-bold">{meetup.title}</h1>
            <p className="mb-6 text-gray-600">{meetup.description}</p>

            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-lg">{meetup.date} at {meetup.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-lg">{meetup.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-lg">{meetup.availableSeats} seats available</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${meetup.price.toFixed(2)}</span>
              
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button size="lg" className="text-lg" disabled={meetup.availableSeats === 0}>
                    {meetup.availableSeats === 0 ? 'Sold Out' : 'Confirm Booking'}
                  </Button>
                </PopoverTrigger>
                
                <PopoverContent className="p-6 w-96">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Select Your Seats</h3>
                    
                    {Object.entries(seatPrices).map(([type, price]) => (
                      <div key={type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="capitalize">{type} Seat</label>
                          <span className="text-sm">${price.toFixed(2)} each</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={selectedSeats[type]}
                            onChange={(e) => handleSeatChange(type, e.target.value)}
                            className="w-24 px-3 py-2 border rounded-md"
                            placeholder="0"
                          />
                          <span className="text-sm text-gray-500">
                            Max: {Math.floor(meetup.availableSeats / 3)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleBooking}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          Complete Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}