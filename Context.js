import { createContext, useState } from 'react';
import { Image } from 'react-native';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const [rosterData, setRosterData] = useState([]);

  const getIcon = (inputValue) => {
    if (inputValue === 0) {
      const iconSet = {
        fp: (
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./assets/imgs/ps4Square.png')}
          />
        ),
        bp: (
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./assets/imgs/ps4Triangle.png')}
          />
        ),
        fk: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/ps4X.png')} />,
        bk: (
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./assets/imgs/ps4Circle.png')}
          />
        ),
      };
      return iconSet;
    } else if (inputValue === 1) {
      const iconSet = {
        fp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/xboxX.png')} />,
        bp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/xboxY.png')} />,
        fk: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/xboxA.png')} />,
        bk: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/xboxB.png')} />,
      };
      return iconSet;
    } else if (inputValue === 2) {
      const iconSet = {
        fp: (
          <Image
            style={{ width: 30, height: 30, backgroundColor: 'white', borderRadius: 20 }}
            source={require('./assets/imgs/nintendoY.png')}
          />
        ),
        bp: (
          <Image
            style={{ width: 30, height: 30, backgroundColor: 'white', borderRadius: 20 }}
            source={require('./assets/imgs/nintendoX.png')}
          />
        ),
        fk: (
          <Image
            style={{ width: 30, height: 30, backgroundColor: 'white', borderRadius: 20 }}
            source={require('./assets/imgs/nintendoB.png')}
          />
        ),
        bk: (
          <Image
            style={{ width: 30, height: 30, backgroundColor: 'white', borderRadius: 20 }}
            source={require('./assets/imgs/nintendoA.png')}
          />
        ),
      };
      return iconSet;
    } else if (input == 3) {
      const iconSet = {
        fp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/1.png')} />,
        bp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/2.png')} />,
        fk: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/3.png')} />,
        bk: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/4.png')} />,
      };
      return iconSet;
    }
  };

  return (
    <MyContext.Provider value={[input, setInput, rosterData, setRosterData, getIcon]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
