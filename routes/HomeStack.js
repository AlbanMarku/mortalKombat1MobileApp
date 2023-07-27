import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Kharacter from '../views/Kharacter';
import DrawerStack from './DrawerStack';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });

  return (
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
        }}
      />
    </Stack.Navigator>
  );
}
