"use client";

import Image from "next/image";
import { useState } from "react";

interface BoardProfileCardProps {
  name: string;
  role: string;
  major: string;
  position: string;
  interests: string;
  imageUrl: string;
  linkedIn: string;
}

export const BoardProfileCard = ({
  name,
  role,
  major,
  position,
  interests,
  imageUrl,
  linkedIn,
}: BoardProfileCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <a href={linkedIn} target="_blank" className="max-h-200 w-25 p-4 block">
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        {/* Card content */}
        <div className="relative flex flex-col items-center rounded-lg bg-white p-6 shadow-lg hover:-translate-y-1 hover:scale-105 duration-300 h-full">
          <div className="w-48 h-48 relative overflow-hidden rounded-full mb-4 ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300">      
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover object-center"
            />
          </div>
          <p className="md:font-bold text-center text-lg">{name}</p>
          <p className="text-center text-gray-600 mb-2">{role}</p>
          <p className="text-center text-sm text-gray-500">{major}</p>
        </div>
      </div>
    </a>
  );
};
