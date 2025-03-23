import React, { useState, useEffect } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${API_URL}/api/event/get-event`);
        const eventData = response.data.events || [];
        setEvents(eventData);

        const initialIndexes = eventData.reduce((acc, event) => {
          if (Array.isArray(event.imageUrls) && event.imageUrls.length > 0) {
            acc[event._id] = 0;
          }
          return acc;
        }, {});

        setImageIndexes(initialIndexes);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        events.forEach((event) => {
          if (Array.isArray(event.imageUrls) && event.imageUrls.length > 1) {
            newIndexes[event._id] = (newIndexes[event._id] + 1) % event.imageUrls.length;
          }
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">🎉 Our Events</h2>

      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => {
            const images = event.imageUrls || [];
            return (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image Slider */}
                <div className="relative w-full h-64 bg-gray-200">
                  <img
                    src={images[imageIndexes[event._id]] || "https://via.placeholder.com/300"}
                    alt={event.title || "Event"}
                    className="w-full h-full object-fill rounded-t-xl"
                  />
                </div>

                {/* Event Details */}
                {/* <div className="p-5 text-center">
                  {event.title && (
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">{event.title}</h3>
                  )}
                  {event.description && (
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500">🚀 No events available yet. Stay tuned!</p>
        </div>
      )}
    </div>
  );
};

export default Event;