import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as Splashscreen from 'expo-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';
import { useEffect, useState } from 'react';
import { InputContext } from './Context';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import MyStack from './routes/HomeStack';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({ mk11: require('./assets/fonts/mk11Reg.otf') });

  const [input, setInput] = useState(0);

  useEffect(() => {
    console.log('Input changed to...');
    console.log(input);
  }, [input]);

  useEffect(() => {
    async function prepare() {
      await Splashscreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    Splashscreen.hideAsync();
  }

  return (
    <InputContext.Provider value={{ input, setInput }}>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="black" style="light" />
          <MyStack />
        </NavigationContainer>
      </MenuProvider>
    </InputContext.Provider>
  );
}
