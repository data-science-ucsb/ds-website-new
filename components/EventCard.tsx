"use client";

import Image from "next/image";
import { useState } from "react";
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

function EventCard({ title, description, date, imageUrl}: Event) {
  const [eventInfo, setEventExpanded] = useState(false);

  return (
    <div>
      <div className="transition ease-in-out delay-150 bg-white shadow-lg">
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
          <p className="text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
