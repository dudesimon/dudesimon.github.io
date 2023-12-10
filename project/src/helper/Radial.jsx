import React from 'react';
import DiskTrack from './DiskTrack';

const Radial = ({ trackCount, radialCount }) => {
  const radials = Array.from({ length: radialCount }, (_, index) => (
    <div key={index} className="radial">
      <DiskTrack trackCount={trackCount} />
    </div>
  ));

  return <div className="radial-container">{radials}</div>;
};

export default Radial;
