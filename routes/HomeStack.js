import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Home from '../views/Home';
import About from '../views/About';
import HeaderComp from '../components/HeaderComp';
import Kharacter from '../views/Kharacter';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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
      <Drawer.Screen name="Home" component={Home} options={{ headerRight: () => <HeaderComp /> }} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

function StackNav() {
  <Stack.Navigator>
    <Stack.Screen name="Kharacter" component={Kharacter} />
  </Stack.Navigator>;
}

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <TabNav />
      <StackNav />
    </NavigationContainer>
  );
}
