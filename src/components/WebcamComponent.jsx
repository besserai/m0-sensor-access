import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css'; // Import the CSS file


const WebcamComponent = () => {
    const webcamRef = useRef(null);
    // const [allCameraDevices, setAllCameraDevices] = useState(null);
    const [cameraDeviceId, setCameraDeviceId] = useState(null);
    const [allCamerasInfos, setAllCamerasInfos] = useState([{ label: "test" }, { label: "test2" }])
    const [logmsg, setLogmsg] = useState("logmsg");
    const [currentCameraIdx, setCurrentCameraIdx] = useState(0);
    const [logCameraInfos, setLogCameraInfos] = useState([{ label: "test" }]);

    const findCamera = async () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(async (_) => {

            const devices = await navigator.mediaDevices.enumerateDevices();
            console.dir(navigator.mediaDevices.enumerateDevices());
            const allCameras = devices.filter((device) => device.kind === 'videoinput');

            setAllCamerasInfos(allCameras);
            setCameraDeviceId(allCameras[0])

            // console.log(allCameras)

            setLogCameraInfos(allCameras);

            let rearCamera = devices.find((device) => device.kind === 'videoinput'
                && /(back|rück|environment|rear)/.test(device.label.toLowerCase()));

            if (rearCamera) {
                setCameraDeviceId(rearCamera.deviceId);
            } else if (allCameras.length = 1) {
                // If rear camera not found, use the first available camera (usually front-facing)
                setCameraDeviceId(allCameras[0]);
            } else if (allCameras.length > 1) {
                // If rear camera not found, but more than one present, use the second available camera (usually backwards-facing)
                setCameraDeviceId(allCameras[1]);
            }
        })

    };

    useEffect(() => {
        findCamera();

    }, []);

    useEffect(() => {
        setLogmsg(allCamerasInfos.length);
        // setLogCameraInfos(allCamerasInfos);
    }, [allCamerasInfos]);

    const captureImage = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            // You can do something with the captured image source, like displaying it or sending it to a server.
            console.log(imageSrc);
        }
    };

    const printCamInfos = () => {
        const cameraInfoField = document.getElementById("camera-info-field");
        cameraInfoField.innerText = allCamerasInfos[0].label;
        console.dir(allCamerasInfos);
    }


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
            <button onClick={printCamInfos}>Get Camera Infos</button>
            {allCamerasInfos && allCamerasInfos.length > 1 && (
                <button onClick={() => {
                    let newCameraIndex = currentCameraIdx + 1
                    if (newCameraIndex >= allCamerasInfos.length) {
                        newCameraIndex = 0;
                    }
                    setCurrentCameraIdx(newCameraIndex);

                    setCameraDeviceId(allCamerasInfos[newCameraIndex].deviceId)
                }}>Change Camera</button>
            )}
            <p id="camera-info-field" style={{ fontSize: 15 }}></p>

            log:
            <p>{logmsg}</p>
            {allCamerasInfos.map((camera, i) => {
                return <>
                    {cameraDeviceId && cameraDeviceId.deviceId === camera.deviceId &&
                        <p>SELECTED CAM:</p>
                    }
                    <p key={i}>{allCamerasInfos[i].label}</p>
                    {/* <p key={i}>{allCamerasInfos[i].deviceId}</p> */}
                </>
            })}
        </div >
    );
};

export default WebcamComponent;
