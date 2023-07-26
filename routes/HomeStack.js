import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../views/Home';
import About from '../views/About';

const Drawer = createDrawerNavigator();

function TabNav() {
  return (
    <Drawer.Navigator>
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
