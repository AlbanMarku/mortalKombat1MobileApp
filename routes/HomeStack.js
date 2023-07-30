import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import Kharacter from '../views/Kharacter';
import DrawerStack from './DrawerStack';
import HeaderComp from '../components/HeaderComp';

//add box shadow

const Stack = createNativeStackNavigator();

export default function MyStack() {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'mk11',
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Home" component={DrawerStack} options={{ headerShown: false }} />
        <Stack.Screen
          name="Kharacter"
          component={Kharacter}
          options={{
            headerShown: true,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerRight: () => <HeaderComp />,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
