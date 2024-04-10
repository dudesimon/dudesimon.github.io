import { MAX_NUMBER_OF_TRACKS, MIN_NUMBER_OF_TRACKS, PLATTER_SIZE, SPINDLE_SIZE } from "./assets/constants";
import React, { useContext, useEffect, useState } from "react";
import Radial from "./components/Radial";
import DiskArm from "./components/DiskArm";
import NumberInput from "./components/NumbersInput";
import "./App.css";
import DraggableList from "./components/DraggableList";
import { NumbersContext, NumbersProvider } from "./components/NumbersContext";

function App() {
    const [numberOfTracks, setNumberOfTracks] = useState(1);
    const [degreeRotation, setDegreeRotation] = useState(61);
    const [currentData, setCurrentData] = useState("");
    const [isWriting, setIsWriting] = useState(false);
    const [currentlyWriting, setCurrentlyWriting] = useState(-1)
    const { numbers } = useContext(NumbersContext)
    const [trackData, setTrackData] = useState([...Array(numberOfTracks)].map((v, i) => {
        return {
            id: i,
            maxSize: 2 ** (i + 1),
            data: []
        }
    }))
    //animation trial
    const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

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
        const d1 = 280
        const r1 = 290
        const radius = ((PLATTER_SIZE - SPINDLE_SIZE) / numberOfTracks) * (trackNumber + 1) + SPINDLE_SIZE
        const r2 = radius - ((PLATTER_SIZE - SPINDLE_SIZE) / numberOfTracks) / 2
        const rotation = Math.acos((d1 ** 2 + r1 ** 2 - r2 ** 2) / (2 * d1 * r1)) * (180 / Math.PI)
        //console.log(trackNumber, radius, r2, rotation)
        setDegreeRotation(rotation / 2)
    }

    const waitForArm = async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 4000));
    }

    //Numbers from NumbersContext
    //console.log(numbers.map(number => +number.primary))

    const enableAnimation = () => {
        setIsAnimationEnabled(false);
    };

    const startWritingData = async () => {
        setIsWriting(true);
        for (const number of numbers) {
            const track = Math.floor(+number.primary / +sectorCount);
            setCurrentlyWriting(+number.primary);
            if (+number.primary + 1 > +sectorCount * numberOfTracks) {
                console.log(+sectorCount * numberOfTracks)
                alert("The number entered exceeds the number of sectors")
            } else {
                setIsAnimationEnabled(true);
                // await waitForArm();
                goToTrack(track);
                await waitForArm();
                setIsAnimationEnabled(false);
            }

        }
        removeHeadFromTrack();
        setCurrentlyWriting(-1);
    }

    return (
        <>

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
                                    enableAnimation(false)
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
                                    <option key={i} value={i + 1}>
                                        {i + 1}
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
                                [...new Array(7)].map((_, i) => {
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
                    isAnimationEnabled={isAnimationEnabled}
                    enableAnimation={enableAnimation}
                />
                <DiskArm currentlyWriting={currentlyWriting} degreeRotation={degreeRotation} />
                <button onClick={startWritingData} style={{ backgroundColor: numbers.length > 0 ? 'green' : 'initial' }}>Start!</button>
                <DraggableList />
            </main>
        </>
    );
}

export default App;
