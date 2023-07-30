import { createContext, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const [rosterData, setRosterData] = useState([]);

  // Define the getIcon function here
  const getIcon = (inputValue) => {
    // Icon logic based on the inputValue (inputDisplay) goes here
    // Return the appropriate icon component
    // For example:
    if (inputValue === 0) {
      const iconSet = {
        fp: <Feather name="square" size={24} color="white" />,
        bp: <MaterialCommunityIcons name="triangle-outline" size={24} color="white" />,
        fk: <Feather name="x" size={24} color="white" />,
        bk: <FontAwesome name="circle-o" size={24} color="white" />,
      };
      return iconSet;
    } else if (inputValue === 1) {
      return 1;
    } else {
      return 33;
    }
  };

  return (
    <MyContext.Provider value={[input, setInput, rosterData, setRosterData, getIcon]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
