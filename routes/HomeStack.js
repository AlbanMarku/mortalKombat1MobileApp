import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { InputContext } from '../Context';
import Home from '../views/Home';
import About from '../views/About';
import HeaderComp from '../components/HeaderComp';
import { useEffect, useState } from 'react';
const Drawer = createDrawerNavigator();

function TabNav() {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });

  const [input, setInput] = useState(0);

  useEffect(() => {
    console.log('Input changed to...');
    console.log(input);
  }, [input]);

  return (
    <InputContext.Provider value={{ input, setInput }}>
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
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerRight: () => <HeaderComp /> }}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </InputContext.Provider>
  );
}

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}
