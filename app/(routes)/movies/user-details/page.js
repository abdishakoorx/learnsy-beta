'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookingGuide } from '../_components/BookingGuide';
import LoadingPage from '../loading';
import { FaCalendarDay, FaClock, FaCouch, FaCrown, FaMoneyBillWave } from 'react-icons/fa';
import { Clapperboard, House, ScreenShare } from 'lucide-react';
import GlobalApi from '@/app/_utils/GlobalApi';

function UserDetailsPage() {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [bookingSummary, setBookingSummary] = useState({});
    const [selectedSnacks, setSelectedSnacks] = useState({});
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState('0');
    const searchParams = useSearchParams();
    const router = useRouter();
    const [phoneError, setPhoneError] = useState('');
    const movieId = searchParams.get('movie');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await GlobalApi.GetMovieById(movieId);
                setMovieDetails(result.movie);

                setBookingSummary({
                    cinema: searchParams.get('cinema') || 'Unknown Cinema',
                    date: searchParams.get('date') || 'Unknown Date',
                    time: searchParams.get('time') || 'Unknown Time',
                    format: searchParams.get('format') || 'Unknown Format',
                    seats: searchParams.get('seats') || 'No seats selected',
                    ticketPrice: searchParams.get('ticketPrice') || '0',
                });

                const totalFromUrl = searchParams.get('total');
                setTotalPrice(totalFromUrl || '0');

                const snacksParam = searchParams.get('snacks');
                if (snacksParam) {
                    setSelectedSnacks(JSON.parse(decodeURIComponent(snacksParam)));
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchParams, movieId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allDetails = new URLSearchParams(searchParams);
        allDetails.set('userName', userDetails.name);
        allDetails.set('userEmail', userDetails.email);
        allDetails.set('userPhone', userDetails.phone);
        router.push(`/movies/payment?${allDetails.toString()}`);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setUserDetails(prev => ({ ...prev, phone: value }));
            setPhoneError(value.length === 10 ? '' : 'Phone number must be 10 digits');
        }
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <BookingGuide currentStep={6} />
            <div className="p-6 mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-2/3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            name="name"
                                            value={userDetails.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="example@gmail.com"
                                            name="email"
                                            type="email"
                                            value={userDetails.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            placeholder="07XXXXXXXX"
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={userDetails.phone}
                                            onChange={handlePhoneChange}
                                            maxLength={10}
                                            pattern="[0-9]{10}"
                                            required
                                        />
                                        {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
                                    </div>
                                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary">Continue to Payment</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="p-6 text-white bg-gray-800 rounded-lg">
                            <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
                            <hr className="mb-4 border-gray-600" />

                            <p className="flex items-center gap-2 mb-2"><House className='w-5 h-5 text-yellow-500' /> {bookingSummary.cinema}</p>
                            {movieDetails && <p className="flex items-center gap-2 mb-2"><Clapperboard className='w-5 h-5 text-yellow-500' /> {movieDetails.title}</p>}
                            <p className="flex items-center gap-2 mb-2"><ScreenShare className='w-5 h-5 text-yellow-500' /> {bookingSummary.format}</p>
                            <p className="flex items-center gap-2 mb-2"><FaCalendarDay className='w-5 h-5 text-yellow-500' /> {bookingSummary.date}</p>
                            <p className="flex items-center gap-2 mb-2"><FaClock className='w-5 h-5 text-yellow-500' /> {bookingSummary.time}</p>
                            <p className="flex items-center gap-2 mb-2"><FaCouch className='w-5 h-5 text-yellow-500' /> {bookingSummary.seats}</p>

                            {Object.keys(selectedSnacks).length > 0 && (
                                <>
                                    <hr className="my-4 border-gray-600" />
                                    <h3 className="mb-2 text-lg font-semibold">Selected Snacks:</h3>
                                    {Object.entries(selectedSnacks).map(([snackId, options]) => (
                                        Object.entries(options).map(([option, quantity]) => {
                                            const parsedOption = JSON.parse(option);
                                            const optionName = parsedOption.size || parsedOption.flavor || parsedOption.type;
                                            const price = parsedOption.price || parsedOption[Object.keys(parsedOption)[1]];
                                            return (
                                                <p key={`${snackId}-${option}`} className="flex items-center gap-2 mb-2">
                                                    <span className="text-yellow-500">•</span> {snackId} ({optionName}): {quantity} x KSh {price} = KSh {(quantity * price).toFixed(2)}
                                                </p>
                                            );
                                        })
                                    ))}
                                </>
                            )}

                            <hr className="my-4 border-gray-600" />
                            <p className="flex items-center justify-between gap-2 mb-2 text-xl font-bold">
                                <span>Total:</span>
                                <span>KSh {totalPrice}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetailsPage;