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
    const [deviceOrientationAccessGranted, setDeviceOrientationAccessGranted] = useState(false);
    const [acceleration, setAcceleration] = useState(null);
    const [manualGs, setManualGs] = useState({ "x": 0, "y": 0, "z": 0 });
    const [altitude, setAltitude] = useState(null);

    const [logmsg, setLogmsg] = useState("logmsg");

    const accelInfo = document.getElementById('accel-info');

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            // setLogmsg("handleDeviceMotion");
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


    const requestOrientationAccess = () => {

        return new Promise((resolve, reject) => {
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            console.log("isSafari:", isSafari)
            setLogmsg(`isSafari: ${isSafari}`);

            if (isSafari) {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            setDeviceOrientationAccessGranted(true);
                            console.log("Device orientation access has already been granted");
                        } else if (permissionState === 'prompt') {
                            console.log("User will be prompted for device orientation access");
                        } else if (permissionState === 'denied') {
                            console.log("Device orientation access has been denied");
                        }
                        setLogmsg(`state: ${permissionState}`);
                    })
                    .catch(console.error);
            } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Handle successful geolocation access
                        const { latitude, longitude } = position.coords;
                        console.log("Latitude:", latitude);
                        console.log("Longitude:", longitude);
                        resolve();
                        setLogmsg(`access granted on android`);
                    },
                    (error) => {
                        // Handle geolocation access error
                        console.error("Error requesting geolocation access:", error);
                        if (error.code === error.PERMISSION_DENIED) {
                            console.error("User denied the request for Geolocation.");
                        }
                        reject(error);
                    }
                );
            } else {
                // Geolocation is not supported by the browser
                console.error("Geolocation is not supported");
                reject(new Error("Geolocation is not supported"));
            }
        });
    };


    // const checkPermission = () => {
    //     if (window.DeviceOrientationEvent) {

    //         console.log("DeviceOrientationEvent is available");

    //         } else {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     // Handle successful geolocation access
    //                     const { latitude, longitude } = position.coords;
    //                     console.log("Latitude:", latitude);
    //                     console.log("Longitude:", longitude);
    //                     resolve();
    //                 },
    //                 (error) => {
    //                     // Handle geolocation access error
    //                     console.error("Error requesting geolocation access:", error);
    //                     reject(error);
    //                 }
    //             );       }             
    //     } else {
    //         console.error('DeviceOrientationEvent not available');
    //         setLogmsg("DeviceOrientationEvent not available");
    //     }}

    return (
        <div>
            {/* {acceleration ? ( */}
            {true ? (
                <div>
                    <h2>Accelerometer Data</h2>

                    {/* <button onClick={() => { DeviceOrientationEvent.requestPermission() }}>Request permission</button> */}
                    <button onClick={requestOrientationAccess}>Request permission</button>
                    {/* <button onClick={() => { 
                        DeviceOrientationEvent.requestPermission().then(response => {
                            if (response === 'granted') {
                                setDeviceOrientationAccessGranted(true);
                            } else {
                                console.alert("Cannot continue without device orientation access");
                        }} )}}>Request Device Orientation Access</button> */}

                    <p id="accel-info" style={{ "color": "yellow" }}></p>

                    {/* {acceleration.x ? (
                        <p>X: {acceleration.x.toFixed(1)}</p>
                    ) : (<></>)}
                    {acceleration.y ? (
                        <p>Y: {acceleration.y.toFixed(1)}</p>
                    ) : (<></>)}
                    {acceleration.z ? (
                        <p>Z: {acceleration.z.toFixed(1)}</p>
                    ) : (<></>)} */}
                    {/* <p>Y: {acceleration.y.toFixed(1)}</p>
                    <p>Z: {acceleration.z.toFixed(1)}</p> */}
                    <h2>Angles:</h2>
                    {/* {altitude ? (
                        <p>View Altitude: {altitude.toFixed(0)}° </p>
                    ) : (<></>)} */}


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
