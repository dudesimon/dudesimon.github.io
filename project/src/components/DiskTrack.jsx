import { useEffect, useState } from "react";
import { PLATTER_SIZE } from "../assets/constants";

const DiskTrack = (props) => {
  const { radius, hovered, setHovered, unsetHovered, onClick, sectorCount, numberOfTracks, trackNumber } = props;

  const styles = {
    width: `${radius}px`,
    height: `${radius}px`,
    border: "3px solid black",
    borderRadius: "50%",
    position: "absolute",
    background: hovered
      ? "linear-gradient(to right,#8ae68b,#6713df)"
      : "linear-gradient(to right, #eee, #000)",
    borderColor: hovered ? "white" : "black",
    cursor: hovered ? "pointer" : "default",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const additionalDivStyles = {
    width: `25%`,
    height: `25%`,
    background:"linear-gradient(to right, #eee, #000)",
    borderRadius: "50%",
    border: "3px solid black",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2, 
  };


  return (
    console.log(trackNumber, radius),
    <div
      onMouseOver={setHovered}
      onMouseLeave={unsetHovered}
      onClick={onClick}
      style={styles}
    >
      {[...Array(+sectorCount)].map((_, index) => {
        const offset = radius - (PLATTER_SIZE / 2 / numberOfTracks)
        const topAngle = ((360 / +sectorCount) * index)

        const horizontalOffset = Math.cos(topAngle * (Math.PI / 180)) * offset
        const verticalOffset = Math.sin(topAngle * (Math.PI / 180)) * offset

        return (
          <div key={+sectorCount * index} style={{
            position: "absolute",
            marginTop: verticalOffset + "px",
            marginLeft: horizontalOffset + "px",
            fontWeight: "bold",
            fontSize: `${5 + (14 - +sectorCount)}px`,
            //animation: "rotate linear 5s infinite forwards"
          }}>
            {((numberOfTracks - trackNumber) * sectorCount) + index}
          </div>
        )
      })}

      {trackNumber === numberOfTracks && (
        <div style={additionalDivStyles}>
          •
        </div>
      )}

    </div>
  );
}
export default DiskTrack;
