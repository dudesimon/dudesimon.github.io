import { useEffect, useState } from "react"
import { PLATTER_SIZE } from "./../assets/constants.jsx";
import DiskTrack from "./DiskTrack.jsx"

const Radial = (props) => {
    const { numberOfTracks, writeData } = props
    const [hovered, setHovered] = useState(-1)
    const [trackData, setTrackData] = useState([...Array(numberOfTracks)].map((v, i) => {
        return {
            id: i,
            maxSize: 2**(i + 1),
            data: []
        }
    }))

    useEffect(() => {
        setTrackData((prevTrackData) => {
        for (let i = 0; i < prevTrackData.length; i++) {
            const track = prevTrackData[i];
            const remainingSpace = track.maxSize - track.data.length;

            if (remainingSpace >= writeData.length) {
                return prevTrackData.map((v, index) => {
                    if (index === i) {
                        return {
                            ...v,
                            data: [...v.data, ...writeData.split("")]
                        };
                    } else {
                        return v;
                    }
                });
            }
        }

        // If no track has enough space, return the unchanged state
        return prevTrackData;
    });
}, [writeData]);

    console.log(trackData)

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
                animation: "rotate linear 5s infinite forwards",
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
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default Radial;

