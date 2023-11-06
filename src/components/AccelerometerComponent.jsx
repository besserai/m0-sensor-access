// src/components/AccelerometerComponent.js
import ReactAccelorometerValue from 'reactaccelerometervalue'
import React, { useState, useEffect } from 'react';

const radians_to_degrees = (radians) => {
    var pi = Math.PI;
    return radians * (180 / pi);
}

const calcAltitude = (y = 0, z = 0) => {
    let alpha = radians_to_degrees(Math.atan(- z / y));
    return alpha;
}

const calcTilt = (x = 0, y = 0, z = 0) => {
    let alpha = radians_to_degrees(Math.atan(- z / y));
    let beta = radians_to_degrees(Math.atan(x / (y * Math.sin(alpha) + z * Math.cos(alpha))));

    return beta;
}

const AccelerometerComponent = () => {
    const [acceleration, setAcceleration] = useState(null);
    const [manualGs, setManualGs] = useState({ "x": 0, "y": 0, "z": 0 });
    const [altitude, setAltitude] = useState(null);

    const [logmsg, setLogmsg] = useState("logmsg");

    const accelInfo = document.getElementById('accel-info');

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            setLogmsg("handleDeviceMotion");
            const { accelerationIncludingGravity } = event;
            setAcceleration(accelerationIncludingGravity);
            // calc altitude angle of phone
            setAltitude(calcAltitude(accelerationIncludingGravity.y, accelerationIncludingGravity.z));


        };

        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        } else {
            console.error('DeviceMotionEvent not available in this browser.');
            setLogmsg("DeviceMotionEvent not available in this browser.");
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

                    {acceleration.x ? (
                        <p>X: {acceleration.x.toFixed(1)}</p>
                    ) : (<></>)}
                    {acceleration.y ? (
                        <p>Y: {acceleration.y.toFixed(1)}</p>
                    ) : (<></>)}
                    {acceleration.z ? (
                        <p>Z: {acceleration.z.toFixed(1)}</p>
                    ) : (<></>)}
                    {/* <p>Y: {acceleration.y.toFixed(1)}</p>
                    <p>Z: {acceleration.z.toFixed(1)}</p> */}
                    <h2>Angles:</h2>
                    {altitude ? (
                        <p>View Altitude: {altitude.toFixed(0)}° </p>
                    ) : (<></>)}


                </div>
            ) : (
                <p>Unable to access accelerometer data.</p>
            )}
            <ReactAccelorometerValue>
            </ReactAccelorometerValue>

            log:
            <p>{logmsg}</p>
        </div>


    );
};

export default AccelerometerComponent;
