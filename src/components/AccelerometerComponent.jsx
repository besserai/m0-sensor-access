// src/components/AccelerometerComponent.js
import React, { useState, useEffect } from 'react';

const AccelerometerComponent = () => {
    const [acceleration, setAcceleration] = useState(null);

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            const { accelerationIncludingGravity } = event;
            setAcceleration(accelerationIncludingGravity);
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
                    <p>X: {acceleration.x}</p>
                    <p>Y: {acceleration.y}</p>
                    <p>Z: {acceleration.z}</p>
                </div>
            ) : (
                <p>Unable to access accelerometer data.</p>
            )}
        </div>
    );
};

export default AccelerometerComponent;
