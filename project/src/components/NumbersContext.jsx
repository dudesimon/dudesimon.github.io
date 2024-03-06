import React, { createContext, useState } from 'react';

export const NumbersContext = createContext();

export const NumbersProvider = ({ children }) => {
  const [numbers, setNumbers] = useState([]);
  const [stats, setStats] = useState([]);

  const addNumbers = (newNumbers) => {
    const updatedNumbers = newNumbers.map((num, index) => ({
      id: `number-${numbers.length + index}`,
      primary: num.toString()
    }));

    setNumbers(prev => [...prev, ...updatedNumbers]);
  };

  const clearNumbers = () => {
    setNumbers([]); // Set the numbers array to an empty array
    setStats([]);
  };

  return (
    <NumbersContext.Provider value={{ numbers, setStats, setNumbers, addNumbers, clearNumbers }}>
      {children}
    </NumbersContext.Provider>
  );
};