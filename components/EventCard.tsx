"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <motion.div className="relative w-full" style={{ height: `${imageHeight}px` }}>
        <Image
          src={(!eventInfo) ? imageUrl : expandedImage}
          alt={title}
          sizes="(max-width: 640px) 100vw, 640px"
          fill
          style={{ objectFit: "cover" }}
          className="bg-coverrounded-t-lg"
        />
      </motion.div>
      <motion.div className="px-6 py-4">
        <motion.div className="font-bold text-xl mb-2">{title}</motion.div>
        {(!eventInfo) 
        ? <p className="text-gray-700 text-base">{description}</p>
        : <p className="text-gray-700 text-base" style={{height: "auto"}}>{longDescription}</p>
        }
      </motion.div>
      <motion.div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {date}
        </span>
      </motion.div>
    </motion.div>
  </button>
  );
}

export default EventCard;
