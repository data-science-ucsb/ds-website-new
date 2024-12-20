"use client";

import React, { useState } from "react";
import events from "@/app/data/events";
import EventCard from "@/components/EventCard";

function Events() {

  const [anEventExpanded, setAnEventExpanded] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Past Events
      </h1>
      <div className="flex flex-wrap -mx-1 lg:-mx-2">
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
}



export default Events;
