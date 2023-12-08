// src/components/GpsComponent.js
import React, { useState, useEffect } from 'react';
var SunCalc = require('suncalc');


const GpsComponent = () => {
    const [location, setLocation] = useState(null);
    const [logmsg, setLogmsg] = useState("logmsg");


    useEffect(() => {
        // Check if geolocation is available in the browser

    }, []);

    const requestLocationPermission = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error accessing geolocation:', error.message);
                    setLogmsg(error.code);
                    if (error.code === 1) {
                        alert("User denied the request for Geolocation.");
                    }
                    setLocation(null);
                }
            );
            setLogmsg("geolocation available");
        } else {
            console.error('Geolocation not available in this browser.');
            setLocation(null);
            setLogmsg("geolocation NOT available");
        }
    }

    return (
        <div>
            <button onClick={requestLocationPermission}>Request Location Permission</button>
            {location ? (
                <div>
                    <h2>Your Current Location</h2>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                    <p>Time: {Date.now()}</p>
                    <h2>Sun's calculated position:</h2>
                    <p>Altitude {SunCalc.getPosition(Date.now(), location.latitude, location.longitude).altitude * 180 / Math.PI}</p>
                    <p>Azimuth {SunCalc.getPosition(Date.now(), location.latitude, location.longitude).azimuth * 180 / Math.PI + 180}</p>
                </div>

            ) : (
                <p>Unable to access geolocation.</p>
            )}

            log:
            <p>{logmsg}</p>

        </div>
    );
};

export default GpsComponent;
