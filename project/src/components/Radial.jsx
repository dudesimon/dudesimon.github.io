import { useEffect, useState } from "react"
import { PLATTER_SIZE } from "./../assets/constants.jsx";
import DiskTrack from "./DiskTrack.jsx"

const Radial = (props) => {
    const { numberOfTracks, writeData, trackData, setTrackData, sectorCount } = props
    const [hovered, setHovered] = useState(-1)

    const handleClick = (trackNumber) => {
        // Calculate the reversed track number
        const reversedTrackNumber = numberOfTracks - 1 - trackNumber;

        const dataInSelectedTrack = trackData[reversedTrackNumber].data;
        alert(`Inside this track: ${dataInSelectedTrack}`);
        console.log(`${sectorCount}`)
    };

    return (
        <div
            style={{
                boxSizing: "border-box",
                marginTop: "40px",
                height: `${PLATTER_SIZE}px`,
                width: `${PLATTER_SIZE}px`,
                margin: "40px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //animation: "rotate linear 5s infinite reverse",
            }}
        >
            {[...Array(numberOfTracks)].map((_, i) => {
                    return (
                        <DiskTrack
                            radius={
                                PLATTER_SIZE - (PLATTER_SIZE / numberOfTracks) * i
                            }
                            hovered={hovered === i}
                            setHovered={() => setHovered(i)}
                            unsetHovered={() => setHovered(-1)}
                            onClick={() => handleClick(i)}
                            sectorCount={sectorCount}
                            key={i}
                            trackNumber={numberOfTracks - i}
                            numberOfTracks={numberOfTracks}
                        />

                    );
            })}
        </div>
    );
};

export default Radial;

