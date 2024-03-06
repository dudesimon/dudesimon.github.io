import { MAX_NUMBER_OF_TRACKS, MIN_NUMBER_OF_TRACKS } from "./assets/constants.jsx";
import React, { useEffect, useState } from "react";
import Radial from "./components/Radial.jsx";
import DiskArm from "./components/DiskArm.jsx";
import NumberInput from "./components/NumbersInput.jsx";
import "./App.css";
import DraggableList from "./components/DraggableList.jsx";
import { NumbersProvider } from "./components/NumbersContext.jsx";

function App() {
    const [numberOfTracks, setNumberOfTracks] = useState(2);
    const [degreeRotation, setDegreeRotation] = useState(61);
    const [currentData, setCurrentData] = useState("");
    const [isWriting, setIsWriting] = useState(false);
    const [currentlyWriting, setCurrentlyWriting] = useState(-1)
    const [trackData, setTrackData] = useState([...Array(numberOfTracks)].map((v, i) => {
        return {
            id: i,
            maxSize: 2 ** (i + 1),
            data: []
        }
    }))

    //trial
    const [sectorCount, setSectorCount] = useState("6");

    const handleSectorCountChange = (event) => {
        setSectorCount(event.target.value)
    };
    //end


    useEffect(() => {
        setTrackData([...Array(numberOfTracks)].map((v, i) => {
            return {
                id: i,
                maxSize: 2 ** (i + 1),
                data: []
            }
        }))
    }, [numberOfTracks])

    const removeHeadFromTrack = () => {
        setDegreeRotation(61)
    }

    const goToTrack = (trackNumber) => {
        setDegreeRotation((55 / numberOfTracks) * (trackNumber + 1))
    }

    const waitForArm = async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 300));
    }

    // const startWritingData = async () => {

    //     setIsWriting(true);
    //     let bits = currentData.split("").reverse()
    //     let track = 0

    //     while (bits.length > 0) {
    //         let success = false
    //         while (true) {
    //             if (track >= numberOfTracks) {
    //                 break
    //             }
    //             else if (trackData[track].maxSize === trackData[track].data.length) {
    //                 track++
    //             } else {
    //                 success = true
    //                 break
    //             }
    //         }

    //         if (!success) {
    //             alert("One or more bits were not able to be written to the disk.")
    //             setCurrentData("")
    //             setCurrentlyWriting(-1)
    //             setIsWriting(false)
    //             return
    //         }

    //         console.log("GOING TO TRACK", track)

    //         goToTrack(track); // this activates the animation
    //         const currentBit = bits.pop()
    //         setCurrentlyWriting(currentBit)
    //         // wait for arm
    //         await waitForArm()

    //         trackData[track].data.push(currentBit)
    //         // write the data to track
    //         setCurrentData(bits.reverse().join(""))
    //         bits.reverse()
    //     }
    //     setIsWriting(false)
    //     removeHeadFromTrack()
    //     setCurrentlyWriting(-1)
    // };

    console.log(trackData)

    return (
        <>
            <NumbersProvider>
                <section>
                    <fieldset>
                        <legend>Settings</legend>
                        <label>
                            Number of Tracks
                            <select
                                onChange={(e) => {
                                    const c = confirm("Changing the number of tracks will wipe the disk. Are you sure?")
                                    if (c) {
                                        setNumberOfTracks(+e.target.value)
                                    }
                                }}
                                value={numberOfTracks}
                                style={{ marginLeft: "5px" }}
                            >
                                {[
                                    ...Array(
                                        MAX_NUMBER_OF_TRACKS -
                                        MIN_NUMBER_OF_TRACKS +
                                        1
                                    ),
                                ].map((_, i) => {
                                    return (
                                        <option key={i} value={i + 2}>
                                            {i + 2}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <NumberInput />

                        <label>
                            Number of Sectors
                            <select value={sectorCount} onChange={handleSectorCountChange} >
                                {
                                    [...new Array(5)].map((_, i) => {
                                        return (
                                            <option value={`${i + 6}`} key={`${i + 6}`}>{i + 6}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                    </fieldset>
                </section>
                <main>
                    <Radial
                        numberOfTracks={numberOfTracks}
                        trackData={trackData}
                        setTrackData={setTrackData}
                        sectorCount={sectorCount}
                    />
                    <DiskArm currentlyWriting={currentlyWriting} degreeRotation={degreeRotation} />
                    <DraggableList />
                </main>

            </NumbersProvider>
        </>
    );
}

export default App;
