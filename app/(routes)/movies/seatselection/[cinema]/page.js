"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import GlobalApi from '@/app/_utils/GlobalApi'
import { BookingGuide } from '../../_components/BookingGuide'
import { Button } from '@/components/ui/button'
import { FaCalendarDay, FaClock, FaCouch, FaCrown, FaMoneyBillWave } from 'react-icons/fa'
import LoadingPage from '../../loading'
import {  Clapperboard, House, ScreenShare } from 'lucide-react'

function SeatsPage() {
    const [screenDetails, setScreenDetails] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [movieDetails, setMovieDetails] = useState(null)
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const cinemaName = decodeURIComponent(params.cinema)
    const movieId = searchParams.get('movie')
    const screenName = decodeURIComponent(searchParams.get('screen'))
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const format = searchParams.get('format')
    const pricePerSeat = parseFloat(searchParams.get('price'))

    useEffect(() => {
        GetScreenDetails()
        GetMovieDetails()
    }, []);

    const GetScreenDetails = async () => {
            const result = await GlobalApi.GetScreenDetails(cinemaName, screenName)
            if (result.screens.length > 0) {
                setScreenDetails(result.screens[0])
            } 
    }

    const GetMovieDetails = async () => {
            const result = await GlobalApi.GetMovieById(movieId)
            setMovieDetails(result.movie)
    }

    const handleSeatClick = (rowLabel, seatNumber) => {
        const seatKey = `${rowLabel}${seatNumber}`
        if (selectedSeats.includes(seatKey)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatKey))
        } else {
            setSelectedSeats([...selectedSeats, seatKey])
        }
    }

    const renderSeatLayout = (seatLayout) => {
        return seatLayout.rows.map(row => (
            <div key={row.rowLabel} className="flex items-center mb-4">
                <span className="w-10 font-bold text-center">{row.rowLabel}</span>
                <div className="flex flex-wrap gap-3">
                    {row.seats.map(seat => (
                        <button
                            key={seat.number}
                            className={`w-6 h-6 flex items-center justify-center rounded ${
                                seat.available
                                    ? selectedSeats.includes(`${row.rowLabel}${seat.number}`)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    : 'bg-red-500 text-white cursor-not-allowed'
                            }`}
                            onClick={() => seat.available && handleSeatClick(row.rowLabel, seat.number)}
                            disabled={!seat.available}
                        >
                            <FaCouch className={`text-2xl ${seat.available ? 'text-gray-600' : 'text-white'}`} />
                        </button>
                    ))}
                </div>
            </div>
        ))
    }

    const handleContinue = () => {
        const queryParams = new URLSearchParams({
            cinema: encodeURIComponent(cinemaName),
            movie: movieId,
            screen: encodeURIComponent(screenName),
            date: date,
            time: time,
            format: format,
            seats: selectedSeats.join(','),
            price: pricePerSeat.toString()
        }).toString();
    
        router.push(`/movies/snacks?${queryParams}`);
    }

    const totalPrice = selectedSeats.length * pricePerSeat;

    return (
        <div className="min-h-screen bg-gray-100">
            <BookingGuide currentStep={4} />
            <div className="p-6 mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-3/4">
                        {screenDetails ? (
                            <div>
                                <h2 className="mb-4 text-xl font-semibold">Capacity: {screenDetails.capacity}</h2>
                                <div className="p-4 mb-6 bg-gray-200 rounded-lg">
                                    <div className="flex items-center justify-center w-full h-12 mb-8 font-bold text-white bg-gray-400 rounded">
                                        SCREEN
                                    </div>
                                    <div className="seat-layout">
                                        {renderSeatLayout(screenDetails.seatLayout)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-4">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 mr-2 bg-gray-200 rounded"></div>
                                            <span>Available</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 mr-2 bg-green-500 rounded"></div>
                                            <span>Selected</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 mr-2 bg-red-500 rounded"></div>
                                            <span>Unavailable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <LoadingPage />
                        )}
                    </div>
                    <div className="w-full lg:w-1/4">
                        <div className="p-6 text-white bg-gray-800 rounded-lg">
                            <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
                            <hr className="mb-4 border-gray-600" />
                            
                            <p className="flex items-center gap-2 mb-2"><House className='w-5 h-5 text-yellow-500' /> {cinemaName}</p>
                            {movieDetails && <p className="flex items-center gap-2 mb-2"><Clapperboard className='w-5 h-5 text-yellow-500' /> {movieDetails.title}</p>}
                            <p className="flex items-center gap-2 mb-2"><ScreenShare className='w-5 h-5 text-yellow-500' /> {screenName}</p>
                            <p className="flex items-center gap-2 mb-2"><FaCalendarDay className='w-5 h-5 text-yellow-500' /> {date}</p>
                            <p className="flex items-center gap-2 mb-2"><FaClock className='w-5 h-5 text-yellow-500'/> {time}</p>
                            <p className="flex items-center gap-2 mb-2"><FaCrown className='w-5 h-5 text-yellow-500' /> {format}</p>
                            <p className="flex items-center gap-2 mb-2"><FaCouch className='w-5 h-5 text-yellow-500' /> {selectedSeats.join(', ') || 'None'}</p>
                            <p className="flex items-center gap-2 mb-2"><FaMoneyBillWave className='w-5 h-5 text-yellow-500' /> KSh {totalPrice.toFixed(2)}</p>
                            <Button
                                className="w-full mt-6 bg-secondary hover:bg-secondary-dark"
                                onClick={handleContinue}
                                disabled={selectedSeats.length === 0}
                            >
                                Continue to Snacks
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatsPage
