import React, { useEffect } from 'react';
import L from 'leaflet';

const Map = ({ lat, lng }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([lat, lng], 5);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker for the country
    L.marker([lat, lng]).addTo(map).bindPopup('Country Location').openPopup();

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return <div id="map" style={{ height: '400px', width: '100%', borderRadius: '8px' }}></div>;
};

export default Map;