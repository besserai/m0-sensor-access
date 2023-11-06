import { useEffect, useState } from "react";

export default function Compass() {

    const [heading, setHeading] = useState(null);
    const [tilt, setTilt] = useState(null);
    const [altitude, setAltitude] = useState(null);
    const [infoText, setInfoText] = useState('loading...');


    const quarternionToAngles = (q) => {
        const phi = Math.atan2(2 * q[0] * q[1] + 2 * q[2] * q[3], 1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]) * (180 / Math.PI);
        const theta = Math.asin(2 * q[0] * q[2] - 2 * q[3] * q[1]) * (180 / Math.PI);
        const psi = 90 - Math.atan2(2 * q[0] * q[3] + 2 * q[1] * q[2], 1 - 2 * q[2] * q[2] - 2 * q[3] * q[3]) * (180 / Math.PI);
        // const phi = 3
        return [phi, theta, psi];
    }

    const tryGettingAbsoluteOrientation = () => {
        if ('AbsoluteOrientationSensor' in window) {
            setInfoText("AbsoluteOrientationSensor is supported by your device.");
            console.log("AbsoluteOrientationSensor is supported by your device.");

            let sensor = new window.AbsoluteOrientationSensor();
            sensor.onreading = (e) => {
                let q = e.target.quaternion;
                const [heading, tilt, alt] = quarternionToAngles(q);

                setTilt(tilt)
                setAltitude(alt)
                setHeading(heading)
            }
            console.log(sensor)

            sensor.start();
        } else {
            setInfoText("AbsoluteOrientationSensor is NOT supported by your device.");
        }

    }

    useEffect(() => {
        tryGettingAbsoluteOrientation()
    }
        , [])

    return (
        <div>
            Info: <span id="info-text">{infoText}</span>
            <div>
                {heading ? (
                    <div id="heading">Heading: {heading.toFixed(0)}°</div>
                ) : (
                    <div id="heading">no heading</div>
                )}
                {tilt ? (
                    <div id="tilt">Tilt: {tilt.toFixed(0)}°</div>
                ) : (
                    <div id="tilt">no tilt</div>
                )}
                {altitude ? (
                    <div id="altitude">Altitude: {altitude.toFixed(0)}°</div>
                ) : (
                    <div id="altitude">no altitude</div>
                )}
            </div>
        </div >
    )
}