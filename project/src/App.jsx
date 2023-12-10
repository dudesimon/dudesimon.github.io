import React, { useState } from 'react';
import RotatingPlatter from './helper/DiskTrack';
import InputForm from './helper/Input';
import Radial from './helper/Radial';

const App = () => {
  const [trackCount, setTrackCount] = useState(8);
  const [radialCount, setRadialCount] = useState(1);

  const handleFormSubmit = ({ trackCount, radialCount }) => {
    setTrackCount(trackCount);
    setRadialCount(radialCount);
  };

  return (
    <div className="app">
      <h1>Disk Scheduling Visualization</h1>
      <InputForm onSubmit={handleFormSubmit} />
      <Radial trackCount={trackCount} radialCount={radialCount}/>
    </div>
  );
};

export default App;