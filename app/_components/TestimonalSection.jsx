"use client"
import React from 'react'
import { motion } from 'framer-motion'

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah",
      role: "Concert Enthusiast",
      content: "Lernsy has revolutionized how I attend concerts. The booking process is so smooth, and I love the seat selection feature!",
      image: "/girl1.jpg"
    },
    {
      name: "Mike",
      role: "Sports Fan",
      content: "As a die-hard sports fan, I appreciate how easy Lernsy makes it to book tickets for big games. The mobile tickets are a game-changer!",
      image: "/boy.jpg"
    },
    {
      name: "Emma",
      role: "Movie Buff",
      content: "I use Lernsy for all my movie outings now. The ability to pre-order snacks and skip the lines is fantastic!",
      image: "/girl2.jpg"
    }
  ]

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
    <section className="py-16">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied users
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-300 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-black">{testimonial.name}</h3>
                  <p className="text-black">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-black">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSection