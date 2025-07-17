"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import LogoAnimation from "@/components/LogoAnimation";
import HomepageEventsSection from "@/components/HomepageEventsSection";
import SponsorsSection from "@/components/SponsorsSection";
import events from "@/app/data/homepage-events";
import galleryImages from "@/components/HomepageGallery"; 
import GetInvolvedSection from "@/components/GetInvolvedSection";
import WhereWeWorkSection from "@/components/WhereWeWorkSection";
import AlternatingSection from "@/components/AlternatingSection"; 
import TitleAnimation from "@/components/TitleAnimation";
import { useInView } from "react-intersection-observer"; 
import CountUp from "react-countup"; 
import Link from "@/components/Link"
import headerNavLinks from "@/app/data/headerNavLinks"


export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  if (showAnimation) {
    return <LogoAnimation />;
  }

  return (
    <>
      
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
      ></div>

      
      <motion.div
        className="flex flex-col lg:flex-row items-center w-full h-screen pt-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <motion.h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Data Science UCSB!
          </motion.h1>
          <motion.p
            className="text-lg leading-7 text-gray-500 mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TitleAnimation />
          </motion.p>
          <div className="mt-6 flex space-x-4">
            <Link
              href="/register"
              className="relative overflow-hidden font-medium text-white py-2 px-4 rounded-full bg-blue-500 group"
            >
              <span className="absolute inset-y-0 left-0 w-0 bg-blue-700 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              <span className="relative z-10">Join Us!</span>
            </Link>

            <button
              onClick={() => {
                const missionSection = document.querySelector("#mission-section");
                missionSection?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="font-medium text-gray-700 py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center mt-4 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/homepg.png"
            alt="Homepage Image"
            width={400}
            height={400}
          />
        </motion.div>
      </motion.div>

      {/* Scrollable Content Section */}
      {/* Gallery Section (Commented Out) */}
      {/*
      <div className="container mx-auto my-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 pr-4">
          <h2 className="text-2xl font-bold text-center mb-6">Gallery</h2>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            pauseOnHover={true}
            pauseOnFocus={false}
            className="rounded-lg shadow-lg"
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg flex items-center justify-center bg-gray-100"
                style={{ height: "500px" }} // Set a fixed height for the container
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={500}
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <figcaption className="absolute inset-x-0 bottom-0 text-white text-center text-sm font-medium p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption}
                </figcaption>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      */}

      <div
        id="mission-section"
        className="
          relative 
          w-screen left-1/2 transform -translate-x-1/2 
          overflow-hidden 
          my-16 
          min-h-[75vh] 
          flex items-center justify-center
        "
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://archive.org/download/video1_20250717/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

       
        <div className="relative z-10 container mx-auto flex flex-col items-center text-center px-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="group">
              <h1 className="text-3xl md:text-4xl lg:text-3xl font-extrabold leading-tight text-white">
                Our Mission
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></div>
            </div>
            <p className="text-lg md:text-xl lg:text-xl leading-relaxed text-white max-w-3xl mx-auto">
              We provide Gauchos with the resources and community to learn, share,
              and create in the realm of data science. Our vision is to be the
              platform through which companies and faculty researchers seek the
              best data science talent UCSB has to offer, as well as one that
              empowers students looking to earn this distinction.
            </p>
          </motion.div>
        </div>
      </div>

      
      <AlternatingSection />      

     
      <GetInvolvedSection />

      <WhereWeWorkSection />

      
      <SponsorsSection />
    </>
  );
}
