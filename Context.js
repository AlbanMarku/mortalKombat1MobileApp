import { createContext, useState } from 'react';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const [rosterData, setRosterData] = useState([]);

  return (
    <MyContext.Provider value={[input, setInput, rosterData, setRosterData]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
