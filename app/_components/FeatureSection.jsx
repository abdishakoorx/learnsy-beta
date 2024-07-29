"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function FeatureSection() {
  const features = [
    { title: "Easy Booking", description: "Book tickets for any event with just a few clicks", icon: "🎫" },
    { title: "Seat Selection", description: "Choose your perfect seat with our interactive seating charts", icon: "💺" },
    { title: "Notifications", description: "Get timely reminders about your upcoming events", icon: "🔔" },
    { title: "Merchandise", description: "Shop for official event merchandise right from our app", icon: "👕" },
    { title: "Snack Pre-ordering", description: "Skip the lines by pre-ordering your favorite snacks", icon: "🍿" },
    { title: "Group Bookings", description: "Easily coordinate and book for large groups", icon: "👨‍👩‍👧‍👦" },
    { title: "Loyalty Program", description: "Earn points on purchases and get rewards", icon: "⭐" },
    { title: "Event Reviews", description: "Read and write reviews for past events", icon: "✍️" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <section className="py-8">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover what makes our platform stand out
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center mt-12">
          <motion.button
            className="flex items-center justify-center px-16 py-3 text-xl font-medium tracking-wider text-white border border-transparent shadow-sm rounded-3xl bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={'/sherehe'}>Kwani Hupendi Sherehe?</Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection