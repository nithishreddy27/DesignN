import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';


const EventList = ({ events, onSelectEvent }) => {

  function calculateDifference(regStartDate, regEndDate) {
  const currentDate = new Date();
  const startDate = new Date(regStartDate);
  const endDate = new Date(regEndDate);

  if (currentDate < startDate) 
  {
    const timeDifferenceInMilliseconds = startDate - currentDate;
    const daysDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    const remainingMilliseconds = timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24);
    const hoursDifference = Math.floor(remainingMilliseconds / (1000 * 60 * 60));

    if (daysDifference === 0) 
    {
      return `Registration starts in ${hoursDifference} hours.`;
    } 
    else 
    {
      return `Registration starts in ${daysDifference} days and ${hoursDifference} hours.`;
    }
  } 
  else if (currentDate >= startDate && currentDate <= endDate) 
  {
    return 'Registration is currently open.';
  } 
  else 
  {
    return 'Registration has ended.';
  }
  }
  


  
    return (
      <div className="event-list-container w-1/3 p-4 bg-white rounded-lg shadow-md overflow-y-auto h-screen text-center">
      <h2 className="text-xl font-semibold mt-4 underline mb-5">Events</h2>
      <div className="">
        {events.map((event, index) => {
          const difference = calculateDifference(event.regstartDt, event.regendDt);
          return (
            <div
              key={index}
              className="cursor-pointer hover:text-orange-500 transition duration-300 shadow-lg p-5"
              onClick={() => onSelectEvent(event)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-start justify-center shadow-md">
                  <img
                    src={event.image}
                    alt="Event Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="ml-4 flex flex-col items-start flex-grow pl-5">
                  <p className="text-lg font-semibold">{event.nameOfEvent}</p>
                  <div className="flex items-center text-orange-500 mt-2">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    <p>
                      {difference === "Registration has ended." ? (
                        <p className="text-red-600">{difference}</p>
                      ) : (
                        <p>{difference}</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    
    );
  };
export default EventList;