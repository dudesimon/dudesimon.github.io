import { MAX_NUMBER_OF_TRACKS, MIN_NUMBER_OF_TRACKS } from "./assets/constants.jsx";
import React, { useEffect, useState } from "react";
import Radial from "./helper/Radial.jsx";
import DiskArm from "./helper/DiskArm.jsx";
import "./App.css";

function App() {
    const [numberOfTracks, setNumberOfTracks] = useState(4);
    const [degreeRotation, setDegreeRotation] = useState(61);
    const [currentData, setCurrentData] = useState("");
    const [writeData, setWriteData] = useState("");
    const [isWriting, setIsWriting] = useState(false);

    const goToTrack = () => {
      setDegreeRotation((prevDegreeRotation) => {
          let nextTrack = 0;
  
          // find track with empty data
          while (nextTrack < numberOfTracks && trackData[nextTrack].data.length > 0) {
              nextTrack++;
          }
  
          // if tracks are full, just stay
          if (nextTrack === numberOfTracks) {
              return prevDegreeRotation;
          }
  
          return (55 / numberOfTracks) * (nextTrack + 1);
      });
  };

    const startWritingData = () => {

        setIsWriting(true);
        goToTrack(); // this activates the animation
        setWriteData(currentData); // this tells the platter what to write
        setCurrentData(""); // this clears the input
        setIsWriting(false); // this locks the input
    };

    return (
        <>
            <section>
                <fieldset>
                    <legend>Settings</legend>
                    <label>
                        Number of Tracks
                        <select
                            onChange={(e) => setNumberOfTracks(+e.target.value)}
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
                                    <option key={i} value={i + 4}>
                                        {i + 4}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    <input
                        disabled={isWriting}
                        value={currentData}
                        onChange={(e) => setCurrentData(e.target.value)}
                        placeholder="Enter binary data..."
                    />
                    <button onClick={startWritingData}>Queue Data</button>
                </fieldset>
            </section>
            <main>
                <Radial
                    writeData={writeData}
                    numberOfTracks={numberOfTracks}
                />
                <DiskArm degreeRotation={degreeRotation} />
            </main>
        </>
    );
}

export default App;
