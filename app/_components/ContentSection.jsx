"use client"
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function ContentSection() {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, {
        triggerOnce: true,
        threshold: 0.1
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <section className="py-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="px-4 py-16 sm:px-6 lg:px-8"
                >
                    <h2 className="mb-12 text-3xl font-bold text-center text-primary">Embark on Excitement</h2>
                    <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <motion.div
                            className="p-6 bg-white rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <Image width={150} height={150} src="/cinema.jpg" alt="Cinema" className="object-cover w-full h-48 mb-4 rounded" />
                            <h3 className="mb-2 text-xl font-semibold text-secondary">Cinema Events</h3>
                            <p className="mb-4 text-gray-600">Experience the latest blockbusters and indie films with Lernsy.</p>
                            <motion.button
                                className="px-4 py-2 text-white transition duration-300 rounded bg-accent hover:bg-accent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/movies'}>Explore</Link>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="p-6 bg-white rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <Image width={150} height={150} src="/stadium.jpg" alt="Stadium" className="object-cover w-full h-48 mb-4 rounded" />
                            <h3 className="mb-2 text-xl font-semibold text-secondary">Stadium Events</h3>
                            <p className="mb-4 text-gray-600">Cheer for your favorite teams at the most exciting sports events.</p>
                            <motion.button
                                className="px-4 py-2 text-white transition duration-300 rounded bg-accent hover:bg-accent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/sports'}>Explore</Link>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="p-6 bg-white rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <Image width={150} height={150} src="/concert.jpg" alt="Concert" className="object-cover w-full h-48 mb-4 rounded" />
                            <h3 className="mb-2 text-xl font-semibold text-secondary">Concert Events</h3>
                            <p className="mb-4 text-gray-600">Enjoy the thrill live music from top artists and emerging talents.</p>
                            <motion.button
                                className="px-4 py-2 text-white transition duration-300 rounded bg-accent hover:bg-accent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/sherehe'}>Explore</Link>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="p-6 bg-white rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <Image width={150} height={150} src="/activities.jpg" alt="Concert" className="object-cover w-full h-48 mb-4 rounded" />
                            <h3 className="mb-2 text-xl font-semibold text-secondary">Outdoor Meetups</h3>
                            <p className="mb-4 text-gray-600">Experience exhilarating adventurous activities perfect for all ages.</p>
                            <motion.button
                                className="px-4 py-2 text-white transition duration-300 rounded bg-accent hover:bg-accent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/meetups'}>Explore</Link>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
        </section>
    )
}

export default ContentSection