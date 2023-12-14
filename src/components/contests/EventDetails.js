import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const EventDetails = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <div className="event-details-container w-3/4 p-4 flex justify-center items-center">
        <div className="text-2xl mt-[-80px]">Select an event to see details.</div>
      </div>
    );
  }

  return (
    <div className="container flex mx-auto p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
    <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-500">
        {selectedEvent.nameOfEvent} by <small className="text-gray-500">{selectedEvent.organizedBy}</small>
      </h2>
      <br/><br/><br/>
      <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
    </div>
    <div className="sm:w-3/4 sm:flex-grow p-4 bg-white rounded-lg" style={{ minHeight: 'min-content' }}>
    <div className="text-center mb-3">
        <a
          href={selectedEvent.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white py-2 px-3 rounded-full inline-block transform hover:scale-105 transition-transform duration-300 text-base"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
          Register
        </a>
      </div>

      <div className="sm:grid sm:grid-cols-1">
        <img
          src={selectedEvent.image}
          alt="Event Image"
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="sm:grid sm:grid-cols-1 pt-5">
        <div className="font-bold text-black text-lg mb-2">Event Type</div>
        <p className="text-lg text-orange-500">{selectedEvent.eventType}</p>
        <div className="font-bold text-black text-lg mb-2 mt-4">Event Mode</div>
        <p className="text-lg text-orange-500">{selectedEvent.eventMode}</p>
        <div className="font-bold text-black text-lg mb-2 mt-4">Registration Period</div>
        <p className="text-lg text-orange-500">
          Start Date : {selectedEvent.regstartDt.substring(0, 10)} {selectedEvent.regstartDt.substring(11, 16)}  <br/> End Date     : {"  "+selectedEvent.regendDt.substring(0, 10)} {selectedEvent.regendDt.substring(11, 16)}
        </p>
        <div className="font-bold text-black text-lg mb-2 mt-4">Participation Type</div>
        <p className="text-lg text-orange-500">
          {selectedEvent.participationType}
        </p>
        {selectedEvent.participationType === "Teams" ? (
          <div>
            <div className="font-bold text-black text-lg mb-2 mt-4">Team Size</div>
            <p className="text-lg text-orange-500">{selectedEvent.teamSize}</p>
          </div>
        ) : null}
        <div className="font-bold text-black text-lg mb-2 mt-4">Event Date and Time</div>
        <p className="text-lg text-orange-500">
          {selectedEvent.eventDateandTime.substring(0, 10) + " " + selectedEvent.eventDateandTime.substring(11, 16)} 
        </p>
        <div className="font-bold text-black text-lg mb-2 mt-4">Registration Fees</div>
        {selectedEvent.registrationFees==0 ?  <p className="text-lg text-orange-500">No Registration Fees</p> :  <p className="text-lg text-orange-500">{selectedEvent.registrationFees}</p>}
      </div>
    </div>
  </div>
  
  
  
  );
};





export default EventDetails