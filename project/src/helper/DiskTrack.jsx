import React from "react";
import "./../style/DiskTrack.css";

const DiskTrack = ({ trackCount }) => {
  const radius = 70; //might have to adjust
  const trackElements = Array.from({ length: trackCount }, (_, index) => (
    <div key={index} className="track">
      {index}
    </div>
  ));

  return (
  <div className="disk-track">
    {trackElements.map((track, index) => (
      <div key={index} className="track" style={{ ...calculateTrackStyle(trackCount, radius, index) }}
      > {track} </div>
    ))}
    </div>
  );
};

const calculateTrackStyle = (trackCount, radius, index) => {
  const angle = (360 / trackCount) * index;
  return {
    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
  };
};

export default DiskTrack;
