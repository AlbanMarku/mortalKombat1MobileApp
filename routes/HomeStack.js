import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import Home from '../views/Home';
import About from '../views/About';

const Drawer = createDrawerNavigator();

function TabNav() {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'white',
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'mk11',
        },
        drawerItemStyle: {
          backgroundColor: 'red',
        },
        drawerContentStyle: {
          backgroundColor: 'red',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}
