import React from "react";
import Image from "next/image";
import events from "@/data/events";

interface Event {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const imageWidth = 350;
const imageHeight = 200;

const EventCard: React.FC<Event> = ({ title, description, date, imageUrl }) => (
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
);

const Events: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-8">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
      {events.map((event) => (
        <div
          className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
          key={event.title}
        >
          <EventCard {...event} />
        </div>
      ))}
    </div>
  </div>
);

export default Events;
