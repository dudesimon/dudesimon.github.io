// DiskArm.js
import React from 'react';
import './DiskArm.css';

const DiskArm = ({ position }) => {
  return <div className="disk-arm" style={{ left: `${position}%` }}></div>;
};

export default DiskArm;
