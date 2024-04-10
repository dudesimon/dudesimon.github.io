import { useEffect, useState } from "react";
import { PLATTER_SIZE, SPINDLE_SIZE } from "../assets/constants";

const DiskTrack = (props) => {
  const { radius, hovered, setHovered, unsetHovered, onClick, sectorCount, numberOfTracks, trackNumber, isAnimationEnabled } = props;

  const styles = {
    width: `${radius}px`,
    height: `${radius}px`,
    outline: "3px solid black",
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
    zIndex: trackNumber,
  };

  const additionalDivStyles = {
    width: `${SPINDLE_SIZE}px`,
    height: `${SPINDLE_SIZE}px`,
    background:"linear-gradient(to right, #eee, #000)",
    borderRadius: "50%",
    outline: "3px solid black",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };


  return (
    <div
      onMouseOver={setHovered}
      onMouseLeave={unsetHovered}
      onClick={onClick}
      style={
        styles
      }
    >
      {[...Array(+sectorCount)].map((_, index) => {
        const offset = radius - ((PLATTER_SIZE - SPINDLE_SIZE) / numberOfTracks) / 2
        const topAngle = ((360 / +sectorCount) * index)

        const horizontalOffset = Math.cos(topAngle * (Math.PI / 180)) * offset
        const verticalOffset = Math.sin(topAngle * (Math.PI / 180)) * offset

        return (
          <div key={+sectorCount * index} style={{
            position: "absolute",
            marginTop: verticalOffset + "px",
            marginLeft: horizontalOffset + "px",
            fontWeight: "bold",
            fontSize: `${10 + (20 - +sectorCount)}px`,
            "-webkit-text-fill-color": "white", /* Will override color (regardless of order) */
            "-webkit-text-stroke-width": "1px",
            "-webkit-text-stroke-color": "black",
            animation: isAnimationEnabled ? "rotate linear 4.7s infinite forwards" : 'none',
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
