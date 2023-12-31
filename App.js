import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as Splashscreen from 'expo-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './routes/HomeStack';
import { StatusBar } from 'expo-status-bar';
import MyProvider from './Context';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  setupURLPolyfill();
  const [fontsLoaded] = useFonts({ mk11: require('./assets/fonts/mk11Reg.otf') });

  useEffect(() => {
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        // Initialization complete!
        console.log(adapterStatuses);
      });
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
    <MyProvider>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="black" style="light" />
          <MyStack />
        </NavigationContainer>
      </MenuProvider>
    </MyProvider>
  );
}
