import { createContext, useState } from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

//If context requires more operations, make context file for each value instead of all together.

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [input, setInput] = useState(0);
  const [rosterData, setRosterData] = useState([]);

  const loadImages = async () => {
    try {
      const imageAssets = [
        require('./assets/imgs/ps4Square.png'),
        require('./assets/imgs/ps4Triangle.png'),
        require('./assets/imgs/ps4X.png'),
        require('./assets/imgs/ps4Circle.png'),
        require('./assets/imgs/AMP.png'),
        require('./assets/imgs/xboxX.png'),
        require('./assets/imgs/xboxY.png'),
        require('./assets/imgs/xboxA.png'),
        require('./assets/imgs/xboxB.png'),
        require('./assets/imgs/AMP.png'),
        require('./assets/imgs/nintendoY.png'),
        require('./assets/imgs/nintendoX.png'),
        require('./assets/imgs/nintendoB.png'),
        require('./assets/imgs/nintendoA.png'),
        require('./assets/imgs/AMP.png'),
        require('./assets/imgs/1.png'),
        require('./assets/imgs/2.png'),
        require('./assets/imgs/3.png'),
        require('./assets/imgs/4.png'),
        require('./assets/imgs/AMP.png'),
        require('./assets/imgs/ASSIST.png'),
        require('./assets/imgs/HELD.png'),
        require('./assets/imgs/UP.png'),
        require('./assets/imgs/DOWN.png'),
        require('./assets/imgs/LEFT.png'),
        require('./assets/imgs/RIGHT.png'),
      ];
      await Asset.loadAsync(imageAssets);
    } catch (error) {
      console.log(error);
    }
  };

  loadImages();

  const getIcon = (inputValue, size) => {
    if (inputValue === 1) {
      const iconSet = {
        fp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/ps4Square.png')}
          />
        ),
        bp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/ps4Triangle.png')}
          />
        ),
        fk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/ps4X.png')}
          />
        ),
        bk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/ps4Circle.png')}
          />
        ),
        amp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/AMP.png')} />,
        assist: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/ASSIST.png')} />
        ),
        held: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/HELD.png')} />
        ),
      };
      return iconSet;
    } else if (inputValue === 2) {
      const iconSet = {
        fp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/xboxX.png')}
          />
        ),
        bp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/xboxY.png')}
          />
        ),
        fk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/xboxA.png')}
          />
        ),
        bk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/xboxB.png')}
          />
        ),
        amp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/AMP.png')} />,
        assist: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/ASSIST.png')} />
        ),
        held: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/HELD.png')} />
        ),
      };
      return iconSet;
    } else if (inputValue === 3) {
      const iconSet = {
        fp: (
          <Image
            style={{
              width: size || 20,
              height: size || 20,
              backgroundColor: 'white',
              borderRadius: size || 20,
            }}
            source={require('./assets/imgs/nintendoY.png')}
          />
        ),
        bp: (
          <Image
            style={{
              width: size || 20,
              height: size || 20,
              backgroundColor: 'white',
              borderRadius: size || 20,
            }}
            source={require('./assets/imgs/nintendoX.png')}
          />
        ),
        fk: (
          <Image
            style={{
              width: size || 20,
              height: size || 20,
              backgroundColor: 'white',
              borderRadius: size || 20,
            }}
            source={require('./assets/imgs/nintendoB.png')}
          />
        ),
        bk: (
          <Image
            style={{
              width: size || 20,
              height: size || 20,
              backgroundColor: 'white',
              borderRadius: size || 20,
            }}
            source={require('./assets/imgs/nintendoA.png')}
          />
        ),
        amp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/AMP.png')} />,
        assist: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/ASSIST.png')} />
        ),
        held: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/HELD.png')} />
        ),
      };
      return iconSet;
    } else if (input == 0) {
      const iconSet = {
        fp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/1.png')}
          />
        ),
        bp: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/2.png')}
          />
        ),
        fk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/3.png')}
          />
        ),
        bk: (
          <Image
            style={{ width: size || 20, height: size || 20 }}
            source={require('./assets/imgs/4.png')}
          />
        ),
        amp: <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/AMP.png')} />,
        assist: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/ASSIST.png')} />
        ),
        held: (
          <Image style={{ width: 30, height: 30 }} source={require('./assets/imgs/HELD.png')} />
        ),
      };
      return iconSet;
    }
  };

  //1-4, nrs attack notation.
  //5, amp/enhance move.
  //6, button was held.
  //7, assist button
  const getButton = (button, iconSet) => {
    switch (button) {
      case 1:
        return iconSet.fp;
      case 2:
        return iconSet.bp;
      case 3:
        return iconSet.fk;
      case 4:
        return iconSet.bk;
      case 5:
        return iconSet.amp;
      case 6:
        return iconSet.held;
      case 7:
        return iconSet.assist;
      default:
        return null;
    }
  };

  return (
    <MyContext.Provider value={[input, setInput, rosterData, setRosterData, getIcon, getButton]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
