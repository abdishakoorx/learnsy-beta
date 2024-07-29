"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import GlobalApi from '@/app/_utils/GlobalApi'
import { BookingGuide } from '../_components/BookingGuide'
import { Button } from '@/components/ui/button'
import { FaCalendarDay, FaClock, FaCouch, FaCrown, FaMoneyBillWave } from 'react-icons/fa'
import { Clapperboard, House, ScreenShare, Popcorn, IceCream, CupSoda, Candy } from 'lucide-react'

function SnacksPage() {
    const [movieDetails, setMovieDetails] = useState(null)
    const [selectedSnacks, setSelectedSnacks] = useState({})
    const searchParams = useSearchParams()
    const router = useRouter()
    const cinemaName = decodeURIComponent(searchParams.get('cinema'))
    const movieId = searchParams.get('movie')
    const screenName = decodeURIComponent(searchParams.get('screen'))
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const format = searchParams.get('format')
    const seats = searchParams.get('seats').split(',')
    const ticketPrice = parseFloat(searchParams.get('price')) * seats.length

    useEffect(() => {
        GetMovieDetails()
    }, [])

    const GetMovieDetails = async () => {
        const result = await GlobalApi.GetMovieById(movieId)
        setMovieDetails(result.movie)
    }

    const snacks = [
        {
            id: 'popcorn',
            name: 'Popcorn 🍿',
            options: [
                { size: 'Small', salted: 150, sweet: 160 },
                { size: 'Medium', salted: 200, sweet: 210 },
                { size: 'Large', salted: 250, sweet: 260 },
            ],
        },
        {
            id: 'soda',
            name: 'Soda 🥤',
            options: [
                { size: 'Small', price: 80 },
                { size: 'Medium', price: 100 },
                { size: 'Large', price: 120 },
            ],
        },
        {
            id: 'nachos',
            name: 'Nachos 🧀',
            options: [
                { size: 'Regular', price: 180 },
                { size: 'Large', price: 220 },
            ],
        },
        {
            id: 'hotdog',
            name: 'Hot Dog 🌭',
            options: [
                { size: 'Regular', price: 150 },
                { size: 'Jumbo', price: 200 },
            ],
        },
        {
            id: 'icecream',
            name: 'Ice Cream 🍦',
            options: [
                { flavor: 'Vanilla', price: 100 },
                { flavor: 'Chocolate', price: 100 },
                { flavor: 'Strawberry', price: 100 },
            ],
        },
        {
            id: 'candy',
            name: 'Candy 🍬',
            options: [
                { type: 'Chocolate Bar', price: 80 },
                { type: 'Gummy Bears', price: 70 },
                { type: 'M&M\'s', price: 90 },
            ],
        },
    ]

    const handleSnackSelection = (snackId, option, quantity) => {
        setSelectedSnacks(prev => ({
            ...prev,
            [snackId]: {
                ...prev[snackId],
                [JSON.stringify(option)]: (prev[snackId]?.[JSON.stringify(option)] || 0) + quantity
            }
        }))
    }

    const calculateSnackTotal = () => {
        return Object.entries(selectedSnacks).reduce((total, [snackId, options]) => {
            return total + Object.entries(options).reduce((snackTotal, [option, quantity]) => {
                const parsedOption = JSON.parse(option)
                const price = parsedOption.price || parsedOption[Object.keys(parsedOption)[1]]
                return snackTotal + (price * quantity)
            }, 0)
        }, 0)
    }

    const snackTotal = calculateSnackTotal()
    const totalPrice = ticketPrice + snackTotal

    const handleContinue = () => {
        router.push(`/movies/user-details?cinema=${encodeURIComponent(cinemaName)}&movie=${movieId}&screen=${encodeURIComponent(screenName)}&date=${date}&time=${time}&format=${format}&seats=${seats.join(',')}&snacks=${JSON.stringify(selectedSnacks)}&total=${totalPrice}`)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <BookingGuide currentStep={5} />
            <div className="p-6 mx-auto max-w-8xl">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-3/4">
                        <h2 className="mb-6 text-2xl font-bold">Choose Your Snacks</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {snacks.map(snack => (
                                <div key={snack.id} className="p-4 rounded-lg shadow bg-gray-50">
                                    <h3 className="mb-3 text-xl font-semibold">{snack.name}</h3>
                                    {snack.options.map((option, index) => (
                                        <div key={index} className="flex items-center justify-between mb-2">
                                            <span>{option.size || option.flavor || option.type}</span>
                                            <div className="flex items-center">
                                                <span className="mr-2">
                                                    KSh {option.price || `${option.salted}/${option.sweet}`}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleSnackSelection(snack.id, option, -1)}
                                                    disabled={!selectedSnacks[snack.id]?.[JSON.stringify(option)]}
                                                >
                                                    -
                                                </Button>
                                                <span className="mx-2">
                                                    {selectedSnacks[snack.id]?.[JSON.stringify(option)] || 0}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleSnackSelection(snack.id, option, 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
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
                            <p className="flex items-center gap-2 mb-2"><FaCouch className='w-5 h-5 text-yellow-500' /> {seats.join(', ')}</p>
                            <p className="flex items-center gap-2 mb-2"><FaMoneyBillWave className='w-5 h-5 text-yellow-500' /> Tickets: KSh {ticketPrice.toFixed(2)}</p>
                            
                            {Object.entries(selectedSnacks).map(([snackId, options]) => (
                                Object.entries(options).map(([option, quantity]) => {
                                    const snack = snacks.find(s => s.id === snackId)
                                    const parsedOption = JSON.parse(option)
                                    const optionName = parsedOption.size || parsedOption.flavor || parsedOption.type
                                    const price = parsedOption.price || parsedOption[Object.keys(parsedOption)[1]]
                                    return (
                                        <p key={`${snackId}-${option}`} className="flex items-center gap-2 mb-2">
                                            <span className="text-yellow-500">•</span> {snack.name} ({optionName}): {quantity} x KSh {price} = KSh {(quantity * price).toFixed(2)}
                                        </p>
                                    )
                                })
                            ))}
                            
                            <hr className="my-4 border-gray-600" />
                            <p className="flex items-center justify-between gap-2 mb-2 text-xl font-bold">
                                <span>Total:</span>
                                <span>KSh {totalPrice.toFixed(2)}</span>
                            </p>
                            
                            <Button
                                className="w-full mt-6 bg-secondary hover:bg-secondary-dark"
                                onClick={handleContinue}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnacksPage