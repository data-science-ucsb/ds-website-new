import Image from "next/image";
import React from 'react';
import Link from "next/link";

const BigLittle = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Big Little Program
        </h1>

        <div className="flex justify-center">
          <Image 
            src="/images/blog2022-23/f22-big-little-family-reveal.jpg"
            alt="Big Little Program"
            width={600}
            height={400}
          />
        </div> <br/>
        
        <p className="text-base md:text-lg lg:text-xl leading-7 mx-auto">
        Data Science UCSB is offering a Big Little program where Bigs can mentor littles with career interests,
        bond by doing mutual hobbies, and explore around campus together! The requirement to be a big is being
        at least an upperclassman or prior involvement the club, and anyone can sign up to be a little (especially
        freshmen and sophomores)! Register below!
        </p> <br/>
        <Link target="_blank" href="https://forms.gle/cDJMnX3swHBjc1YW8" className="font-medium text-gray-900 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">Register Now</Link>
        
      </div>
  )
}

export default BigLittle;