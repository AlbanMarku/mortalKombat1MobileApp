import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as Splashscreen from 'expo-splash-screen';
import DrawerStack from './routes/HomeStack';
import { MenuProvider } from 'react-native-popup-menu';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({ mk11: require('./assets/fonts/mk11Reg.otf') });

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
    <MenuProvider>
      <DrawerStack />
    </MenuProvider>
  );
}
