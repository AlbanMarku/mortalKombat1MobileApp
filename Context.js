import { createContext, useState } from 'react';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const [rosterData, setRosterData] = useState([]);

  const getIcon = (inputValue) => {
    if (inputValue === 0) {
      const iconSet = {
        fp: <Feather name="square" size={24} color="white" />,
        bp: <MaterialCommunityIcons name="triangle-outline" size={24} color="white" />,
        fk: <Feather name="x" size={24} color="white" />,
        bk: <FontAwesome name="circle-o" size={24} color="white" />,
      };
      return iconSet;
    } else if (inputValue === 1) {
      const iconSet = {
        // fp: <Icon icon="iconoir:xbox-x" />,
        // bp: <Icon icon="iconoir:xbox-y" />,
        // fk: <Icon icon="iconoir:xbox-a" />,
        // bk: <Icon icon="iconoir:xbox-b" />,
      };
      return iconSet;
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
