"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
import Link from 'next/link';


export default function GetInvolvedSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cards = [
    {
      title: "General Meetings & Workshops",
      description:
        "Join our weekly meetings and hands-on workshops every Tuesday to learn industry relevant topics and meet new people!",
      image: "/images/Workshop2024.jpg",
      link: "/meetings",
    },
    {
      title: "Project Showcase",
      description:
        "Present your projects or explore others' work with industry professionals and executives in attendance.",
      image: "/images/showcase1.jpg",
      link: "/projects",
    },
    {
      title: "Data + Software Career Fair",
      description:
        "Connect with recruiters and industry pros looking for software engineering and data talent this Fall 2025.",
      image: "/images/showcase2.jpg",
      link: "/register",
    },
    {
      title: "Datathon",
      description:
        "Compete to solve real-world problems using data science, with industry executives and big tech companies in attendance!",
      image: "/images/datathon1.jpg",
      link: "https://dataorbit.info/",
    },
  ];

  const stats = [
    { label: "Workshops", value: 100, duration: 4 },
    { label: "Members", value: 600, duration: 6 },
    { label: "Datathon Attendees", value: 200, duration: 5 },
    { label: "Projects", value: 100, duration: 4 },
  ];

  const refs = stats.map(() => useInView({ triggerOnce: true }));

  return (
    <div className="container mx-auto my-16 px-4">
      <motion.div
        className="text-center space-y-6 group"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-900">Get Involved</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Explore how you can participate in UCSB Data Science. Whether you want
          to compete, connect, or create — there’s something for you.
        </p>
      </motion.div>

      <div
        id="next-section"
        className="container mx-auto my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        {stats.map((stat, index) => {
          const { ref, inView } = refs[index];

          return (
            <div key={index} className="flex flex-col items-center" ref={ref}>
              {inView && (
                <div className="flex items-center">
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={stat.duration}
                    className="text-4xl font-extrabold text-blue-500"
                  />
                  <span className="text-4xl font-extrabold text-yellow-500">+</span>
                </div>
              )}
              <p className="text-lg font-medium text-gray-700 mt-2">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="relative text-center mt-8">
        <motion.div
          className="absolute left-[350px] top-1/2 transform -translate-y-1/2 h-1 w-12 bg-yellow-500 rounded-full"
          animate={{
            x: [-5, 5, -5], 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[350px] top-1/2 transform -translate-y-1/2 h-1 w-12 bg-yellow-500 rounded-full"
          animate={{
            x: [5, -5, 5], 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />

        <motion.button
          onClick={() => {
            window.location.href = "/calendar";
          }}
          className="relative overflow-hidden font-medium text-white py-3 px-8 rounded-full bg-blue-500 group"
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0], 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-blue-700 transition-all duration-300 ease-out group-hover:w-full" />
          <span className="relative z-10">View Upcoming Events</span>
        </motion.button>
      </div>

      <div id="four-cards-section" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{ height: "400px" }}
          >
            {card.title === "General Meetings & Workshops" ? (
              <div
                onClick={() => setIsModalOpen(true)}
                className="block h-full group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={500}
                    height={350}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="group">
                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                    <div className="w-20 h-1 bg-blue-500 mx-auto md:mx-0 mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
                  </div>
                  <p className="text-gray-500 mt-2">{card.description}</p>
                  <p className="text-gray-500 mt-2">
                    <u>Learn More</u>
                  </p>
                </div>
              </div>
            ) : (
              <a
                href={card.link}
                target={card.title === "Datathon" ? "_blank" : "_self"}
                rel={card.title === "Datathon" ? "noopener noreferrer" : undefined}
                className="block h-full group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={500}
                    height={350}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="group">
                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                    <div className="w-20 h-1 bg-blue-500 mx-auto md:mx-0 mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
                  </div>
                  <p className="text-gray-500 mt-2">{card.description}</p>
                  <p className="text-gray-500 mt-2">
                    <u>Learn More</u>
                  </p>
                </div>
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <>
        <style>{`body { overflow: hidden; }`}</style>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg z-10 border border-black">
            <h3 className="text-xl font-bold text-gray-900 mb-4">General Meetings & Workshops</h3>
            <p className="text-gray-500">
              Join our weekly meetings and hands-on workshops every Tuesday at 6 PM in TD-W 1701. Follow our <Link href={"https://www.instagram.com/datascienceucsb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="} className='text-blue-600'>Instagram page</Link> (@datascienceucsb) to stay updated!
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
        </>
      )}
    </div>
  );
}
