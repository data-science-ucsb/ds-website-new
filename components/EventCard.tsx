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

// TODO: Add CSS to expand card and replace imgae with expandedImage and description with longDescription
const EventCard = ({ title, description, longDescription, date, imageUrl, expandedImage }: Event) => (
  <div className="event-card">
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
        <Image
          src={imageUrl}
          alt={title}
          sizes="(max-width: 640px) 100vw, 640px"
          fill
          style={{ objectFit: "cover" }}
          className="bg-coverrounded-t-lg"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {date}
        </span>
      </div>
    </div>
  </div>
);

// NON-LAMBDA FUNCTION: This is for useState if needed
// function EventCard({ title, description, date, imageUrl }: Event) {
//   const [eventInfo, setEventExpanded] = useState(false);

//   return (
//     <button onClick={()=>setEventExpanded(!eventInfo)} className="event-card">
//     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
//       <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
//         <Image
//           src={imageUrl}
//           alt={title}
//           sizes="(max-width: 640px) 100vw, 640px"
//           fill
//           style={{ objectFit: "cover" }}
//           className="bg-coverrounded-t-lg"
//         />
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{title}</div>
//         <p className="text-gray-700 text-base">{description}</p>
//       </div>
//       <div className="px-6 pt-4 pb-2">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//           {date}
//         </span>
//       </div>
//     </div>
//   </button>
//   );
// }

export default EventCard;
