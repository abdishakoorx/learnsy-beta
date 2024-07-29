"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { BookingGuide } from '../_components/BookingGuide'
import LoadingPage from '../loading'
import Link from 'next/link'

function ShowingCard({ showing }) {
  return (
    <Link href={`/movies/${showing.movie.id}?cinema=${encodeURIComponent(showing.screen.cinema.name)}&screen=${encodeURIComponent(showing.screen.name)}&time=${encodeURIComponent(showing.startTime)}&price=${encodeURIComponent(showing.price)}`} className="block">
      <div className="flex flex-col h-full p-4 transition-transform duration-300 transform bg-white border rounded-lg shadow-md hover:scale-105">
        <div className="flex-shrink-0 mb-4">
          <Image
            src={showing.movie.icon.url}
            alt={showing.movie.title}
            width={200}
            height={300}
            className="object-cover w-full rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="mb-2 text-xl font-bold truncate">{showing.movie.title}</h2>
            <p className="mb-2 text-lg font-semibold text-blue-600">{showing.screen.name}</p>
            <p className="mb-1 font-bold">KSh {showing.price}</p>
            <p>{showing.startTime}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

function SelectPage() {
  const [showings, setShowings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const cinemaName = searchParams.get('cinema')
  const cinemaId = searchParams.get('id')

  useEffect(() => {
    if (cinemaId) {
      GetShowings()
    }
  }, [cinemaId])

  const GetShowings = () => {
    setIsLoading(true)
    GlobalApi.GetShowings().then((resp) => {
      const filteredShowings = resp.showings.filter(
        showing => showing.screen.cinema.id === cinemaId
      )
      setShowings(filteredShowings)
      setIsLoading(false)
    })
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <BookingGuide currentStep={2} />
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Showings at {cinemaName}
      </h1>
      {showings.length === 0 ? (
        <p className="text-lg text-center">No showings available at {cinemaName} at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {showings.map(showing => (
            <ShowingCard key={showing.id} showing={showing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectPage