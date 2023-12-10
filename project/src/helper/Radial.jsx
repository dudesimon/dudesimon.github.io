import React from 'react';
import DiskTrack from './DiskTrack';

const Radial = ({ trackCount, radialCount }) => {
  const trackRadius = 45;
  const radialSpacing = 60;

  const radials = Array.from({ length: radialCount }, (_, index) => (
    <div key={index} className="radial">
      <DiskTrack trackCount={trackCount} radius={trackRadius + index * radialSpacing}/>
    </div>
  ));

  return <div className="radial-container">{radials}</div>;
};

export default Radial;
