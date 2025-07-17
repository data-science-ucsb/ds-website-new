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
    <a href={linkedIn} target="_blank" className="max-h-200 w-25 p-4">
      <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-lg hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 hover:text-stone-50 duration-300 h-100 overflow-hidden">
        <div className="w-48 h-48 relative overflow-hidden rounded-full mb-2">      
          <Image
            src={imageUrl}
            alt={name}
            fill
          />
        </div>
        <p className="md:font-bold">{name}</p>
        <p>{role}</p> <br/>
        <p>{major}</p>
        <p>{position}</p>
        <p>{interests}</p>
      </div>
    </a>
  );
};
