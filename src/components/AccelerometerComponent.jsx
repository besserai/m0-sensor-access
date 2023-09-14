// src/components/AccelerometerComponent.js
import React, { useState, useEffect } from 'react';

const radians_to_degrees = (radians) => {
    var pi = Math.PI;
    return radians * (180 / pi);
}

const calcAngle = (y = 0, z = 0) => {
    let alpha = radians_to_degrees(Math.atan(- z / y));
    console.log(alpha);
    return alpha;
}

const AccelerometerComponent = () => {
    const [acceleration, setAcceleration] = useState(null);
    const [manualGs, setManualGs] = useState({ "x": 0, "y": 0, "z": 0 });
    const [altitude, setAltitude] = useState(null);

    const accelInfo = document.getElementById('accel-info');

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            const { accelerationIncludingGravity } = event;
            setAcceleration(accelerationIncludingGravity);
            // calc altitude angle of phone

            setAltitude(calcAngle());


        };

        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        } else {
            console.error('DeviceMotionEvent not available in this browser.');
        }

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('devicemotion', handleDeviceMotion);
        };
    }, []);


    return (
        <div>
            {acceleration ? (
                <div>
                    <h2>Accelerometer Data</h2>
                    <p id="accel-info" style={{ "color": "yellow" }}></p>
                    <p>X: {acceleration.x}</p>
                    <p>Y: {acceleration.y}</p>
                    <p>Z: {acceleration.z}</p>
                    <h2>Angles:</h2>
                    <p>View Altitude: {altitude}</p>
                </div>
            ) : (
                <p>Unable to access accelerometer data.</p>
            )}
        </div>
    );
};

export default AccelerometerComponent;
