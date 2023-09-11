import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css'; // Import the CSS file


const WebcamComponent = () => {
    const webcamRef = useRef(null);
    const [cameraDeviceId, setCameraDeviceId] = useState(null);

    useEffect(() => {
        const findCamera = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const allCameras = devices.filter((device) => device.kind === 'videoinput');
            const rearCamera = devices.find((device) => device.kind === 'videoinput'
                && /(back|environment|rear)/.test(device.label));

            if (rearCamera) {
                setCameraDeviceId(rearCamera.deviceId);
            } else if (allCameras.length > 0) {
                // If rear camera not found, use the first available camera (usually front-facing)
                setCameraDeviceId(allCameras[0]);
            }


        };

        findCamera();
    }, []);

    const captureImage = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            // You can do something with the captured image source, like displaying it or sending it to a server.
            console.log(imageSrc);
        }
    };

    return (
        <div className="webcam-container">
            {cameraDeviceId ? (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    videoConstraints={{ deviceId: cameraDeviceId }}
                    screenshotFormat="image/jpeg"
                    className="webcam"

                />
            ) : (
                <p>No camera found.</p>
            )}
            <button onClick={captureImage}>Capture</button>
        </div>
    );
};

export default WebcamComponent;
