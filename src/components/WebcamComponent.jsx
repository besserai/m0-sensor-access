// src/components/WebcamComponent.js
import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
    const webcamRef = useRef(null);

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={() => captureImage(webcamRef)}>Capture</button>
        </div>
    );
};

const captureImage = async (webcamRef) => {
    if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        // You can do something with the captured image source, like displaying it or sending it to a server.
        console.log(imageSrc);
    }
};

export default WebcamComponent;
