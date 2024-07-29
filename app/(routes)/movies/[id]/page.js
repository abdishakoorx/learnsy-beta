"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import GlobalApi from '@/app/_utils/GlobalApi'
import LoadingPage from '../loading'
import { FaDirections, FaUser, FaFilm, FaLanguage, FaStar, FaClock, FaCalendarDay, FaMoneyBillWave, FaCrown } from 'react-icons/fa'
import { format, isAfter, set, parse } from 'date-fns'
import { Button } from '@/components/ui/button'
import { BadgeX, House, Languages, ScreenShare } from 'lucide-react'
import { BookingGuide } from '../_components/BookingGuide'
import ReactPlayer from 'react-player'

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState('2D')
  const [isTimeValid, setIsTimeValid] = useState(true)
  const params = useParams()
  const searchParams = useSearchParams()
  const movieId = params.id
  const cinemaName = searchParams.get('cinema')
  const screenName = searchParams.get('screen')
  const showingTime = searchParams.get('time')
  const basePrice = parseFloat(searchParams.get('price') || '0')
  const router = useRouter()

  useEffect(() => {
    if (movieId) {
      GetMovieDetails(movieId)
    }
  }, [movieId])

  useEffect(() => {
    validateTime() 
  }, [selectedDate, showingTime])

  const GetMovieDetails = async (id) => {
    setIsLoading(true)
    const result = await GlobalApi.GetMovieById(id)
    setMovie(result.movie)
    setIsLoading(false)
  }

  const calculatePrice = () => {
    const priceMultipliers = {
      'Child': 0.75,
      'Student': 0.8,
      '2D': 1,
      '3D': 1.2,
      'VIP': 1.5
    }
    const exactPrice = basePrice * priceMultipliers[selectedFormat];
    const roundedPrice = Math.round(exactPrice / 10) * 10;
    return roundedPrice.toFixed(2);
  }

  const validateTime = () => {
    if (selectedDate && showingTime) {
      const now = new Date()
      
      const [time, period] = showingTime.split(' ')
      let [hours, minutes] = time.split(':')
      hours = parseInt(hours)
      
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0
      }
      
      const showingDateTime = set(selectedDate, { 
        hours: hours, 
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0
      })
  
      setIsTimeValid(isAfter(showingDateTime, now))
  
    } else {
      setIsTimeValid(false)
    }
  }

  const handleContinueToSeatSelection = () => {
    if (selectedDate && isTimeValid) {
      const price = calculatePrice();
      router.push(`/movies/seatselection/${cinemaName}?movie=${movieId}&screen=${screenName}&date=${format(selectedDate, 'yyyy-MM-dd')}&time=${showingTime}&format=${selectedFormat}&price=${encodeURIComponent(price)}`)
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (!movie) {
    return <div className="p-8 text-center">Movie not found</div>
  }

  return (
    <div className="min-h-screen">
      <BookingGuide currentStep={3} />
      <div className="p-3 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full p-6 mb-6 bg-white rounded-lg shadow-md lg:w-3/4 lg:mb-0 lg:mr-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <Image
                  src={movie.icon.url}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h1 className="mb-4 text-3xl font-bold">{movie.title}</h1>
                <h3 className="flex items-center mb-2 text-lg"><FaDirections className="mr-2 text-accent" /><span className='mr-2 font-semibold'>Director:</span> {movie.director}</h3>
                <h3 className="flex items-center mb-2 text-lg"><FaUser className="mr-2 text-accent" /><span className='mr-2 font-semibold'>Cast:</span> {movie.cast}</h3>
                <h3 className="flex items-center mb-2 text-lg"><FaFilm className="mr-2 text-accent" /><span className='mr-2 font-semibold'>Genre:</span> {movie.genre}</h3>
                <h3 className="flex items-center mb-2 text-lg"><Languages className="w-5 h-5 mr-2 text-accent" /> {movie.language}</h3>
                <h3 className="flex items-center mb-2 text-lg"><BadgeX className="w-5 h-5 mr-2 text-accent" /> {movie.rated}</h3>
                <h3 className="flex items-center mb-2 text-lg"><FaClock className="mr-2 text-accent" /> {movie.runtime}</h3>
                <h3 className="flex items-center mb-2 text-lg"><FaStar className="mr-2 text-yellow-500" /> {movie.rating}</h3>
                <h2 className="mt-6 mb-2 text-2xl font-semibold">Plot</h2>
                <h3>{movie.plot}</h3>
              </div>
            </div>
            {movie.trailerUrl && (
              <div className="mt-6 rounded-md">
                <ReactPlayer url={movie.trailerUrl} width="100%" />
              </div>
            )}
          </div>
          <div className="w-full rounded-lg lg:w-1/4">
            <h3 className="mb-2 text-xl font-semibold">Select Date and Format</h3>
            <div className="flex flex-col gap-4 p-4 mb-4 text-black bg-gray-200 rounded-lg">
              <div className="mb-2 mr-4">
                <label htmlFor="date" className="block mb-1">Date</label>
                <div className="flex items-center">
                  <input
                    type="date"
                    id="date"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => {
                      const selectedDate = parse(e.target.value, 'yyyy-MM-dd', new Date())
                      setSelectedDate(selectedDate)
                    }}
                    className="p-2 text-black border rounded"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="format" className="block mb-1">Format</label>
                <select
                  id="format"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="p-2 text-black border rounded border-slate-800"
                >
                  <option value="Student">Student</option>
                  <option value="Child">Child</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
            <div className='p-4 text-white bg-gray-800 rounded-lg'>
              <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
              <hr className="mb-4 border-gray-500" />
              <h3 className="flex items-center gap-2 mb-2 font-semibold"><House className='w-5 h-5 text-yellow-500' /> {cinemaName}</h3>
              <h3 className="flex items-center gap-2 mb-2 font-semibold"><ScreenShare className='w-5 h-5 text-yellow-500' />{screenName}</h3>
              <h3 className={`mb-2 font-semibold items-center flex gap-2 ${!selectedDate ? 'text-red-500' : ''}`}>
                <FaCalendarDay className='w-5 h-5 text-yellow-500' />
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Please Choose Date'}
              </h3>
              {selectedDate && !isTimeValid && (
                <p className="mt-2 text-red-500">No tickets available. Please choose another date or go back and choose another movie.</p>
              )}
              <h3 className="flex items-center gap-2 mb-2 font-semibold"><FaClock className='w-5 h-5 text-yellow-500'/> {showingTime}</h3>
              <h3 className="flex items-center gap-2 mb-2 font-semibold"><FaCrown className='w-5 h-5 text-yellow-500' />{selectedFormat}</h3>
              <h3 className="flex items-center gap-2 mb-2 font-semibold"><FaMoneyBillWave className='w-5 h-5 text-yellow-500' /> KSh {calculatePrice()}</h3>
              <Button
                className="w-full p-2 mt-4 text-white rounded bg-secondary hover:bg-secondary-dark"
                disabled={!selectedDate || !isTimeValid}
                onClick={handleContinueToSeatSelection}
              >
                Continue to Seat Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
