"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

interface Event {
  title: string;
  description: string;
  longDescription: string;
  date: string;
  imageUrl: string;
  expandedImage: string;
}

const imageHeight = 200;

function EventCard({ title, description, longDescription, date, imageUrl, expandedImage }: Event) {
  const [eventInfo, setEventExpanded] = useState(false);

  return (
    <button onClick={()=>setEventExpanded(!eventInfo)} className="hover:shadow-lg">
    {   
    <div className="transition ease-in-out delay-150 bg-white shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 hover:text-white duration-300 ...">
      <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
        <Image
          src={(!eventInfo) ? imageUrl : expandedImage}
          alt={title}
          sizes="(max-width: 640px) 100vw, 640px"
          fill
          style={{ objectFit: "cover" }}
          className="bg-coverrounded-t-lg"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        {(!eventInfo) 
        ? <p className="text-base">{description}</p>
        : <p className="text-base" style={{height: "auto"}}>{longDescription}</p>
        }
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {date}
        </span>
      </div>
    </div>}
  </button>
  );
}

export default EventCard;
