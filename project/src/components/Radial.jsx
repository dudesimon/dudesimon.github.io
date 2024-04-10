import { useEffect, useState } from "react"
import { PLATTER_SIZE, SPINDLE_SIZE } from "./../assets/constants";
import DiskTrack from "./DiskTrack"

const Radial = (props) => {
    const { numberOfTracks, writeData, trackData, setTrackData, sectorCount, isAnimationEnabled } = props
    const [hovered, setHovered] = useState(-1)

    const handleClick = (trackNumber) => {
        // Calculate the reversed track number
        const reversedTrackNumber = numberOfTracks - 1 - trackNumber;

        const dataInSelectedTrack = trackData[reversedTrackNumber].data;
        // alert(`Inside this track: ${dataInSelectedTrack}`);
        //console.log(`${sectorCount}`)
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
                
                animation: isAnimationEnabled ? `rotate linear 7s infinite reverse` : 'none',
            }}
        >
            {[...Array(numberOfTracks)].map((_, i) => {
                return (
                    <DiskTrack
                        radius={
                            ((PLATTER_SIZE - SPINDLE_SIZE) / numberOfTracks) * (i + 1) + SPINDLE_SIZE
                        }
                        hovered={hovered === i}
                        setHovered={() => setHovered(i)}
                        unsetHovered={() => setHovered(-1)}
                        onClick={() => handleClick(i)}
                        sectorCount={sectorCount}
                        key={i}
                        trackNumber={numberOfTracks - i}
                        numberOfTracks={numberOfTracks}
                        isAnimationEnabled={isAnimationEnabled}
                    />

                );
            })}
        </div>
    );
};

export default Radial;

