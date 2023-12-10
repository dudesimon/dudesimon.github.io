import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [radialCount, setRadialCount] = useState('');
  const [trackCount, setTrackCount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      radialCount: parseInt(radialCount, 10),
      trackCount: parseInt(trackCount, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Radial Count:
        <input
          type="number"
          value={radialCount}
          onChange={(e) => setRadialCount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Enter Total Number of Tracks:
        <input
          type="number"
          value={trackCount}
          onChange={(e) => setTrackCount(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Visualize</button>
    </form>
  );
};

export default InputForm;
