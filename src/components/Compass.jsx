import { useEffect, useState } from "react";

export default function Compass() {

    const [heading, setHeading] = useState(null);
    const [infoText, setInfoText] = useState('loading...');

    const handleHeadingSuccess = (e) => {
        setInfoText(`Successfully acquired heading`);
        console.log(e);
    }

    const handleHeadingError = (e) => {
        setInfoText(`Failed to acquire heading`);
        console.log(e);
    }

    const tryGettingHeading = () => {
        if ('watchHeading' in navigator.geolocation) {
            console.log("Start watching for heading changes");
            const watchHeading = navigator.geolocation.watchHeading(
                handleHeadingSuccess,
                handleHeadingError
            );
        } else {
            setInfoText('Geolocation is not supported by your device.');
        }

    }


    useEffect(() => {
        tryGettingHeading()
    }
        , [])

    return (
        <div>
            Info: <span id="info-text">{infoText}</span>
        </div>
    )
}