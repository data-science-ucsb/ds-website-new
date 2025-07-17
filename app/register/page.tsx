import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
            {/* <Image
              src="/images/misc-events/home4.jpg"
              alt="Project Group Collaboration"
              width={600}
              height={400}
            /> */}
        </div> <br></br>
        <p className='text-center'>
        Thanks for your interest! Follow our <Link href={"https://www.instagram.com/datascienceucsb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="} className='text-blue-600'>Instagram page</Link> (@datascienceucsb) to stay tuned for our 2025-26 
        member registration as Fall quarter starts! 
        </p>
    </div>
  )
}

export default Register;