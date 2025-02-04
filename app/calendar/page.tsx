import React from 'react'

const Calendar = () => {
  return (
    <div className="container mx-auto px-4 py-8">

        <h1 className="text-4xl font-bold text-center mb-12">
            Calendar
        </h1>
    
        <div className="flex justify-center">
        <iframe src="https://calendar.google.com/calendar/embed?src=datascience.ucsb%40gmail.com&ctz=America%2FLos_Angeles" width="800" height="600"></iframe>
        </div>
    </div>
  );
}

export default Calendar;