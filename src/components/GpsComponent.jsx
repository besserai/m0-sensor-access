// src/components/GpsComponent.js
import React, { useState, useEffect } from 'react';

const GpsComponent = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error accessing geolocation:', error.message);
                    setLocation(null);
                }
            );
        } else {
            console.error('Geolocation not available in this browser.');
            setLocation(null);
        }
    }, []);

    return (
        <div>
            {location ? (
                <div>
                    <h2>Your Current Location</h2>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Unable to access geolocation.</p>
            )}
        </div>
    );
};

export default GpsComponent;
