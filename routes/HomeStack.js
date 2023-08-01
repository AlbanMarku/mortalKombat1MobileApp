import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Kharacter from '../views/Kharacter';
import DrawerStack from './DrawerStack';
import HeaderComp from '../components/HeaderComp';
import FrameData from '../views/FrameData';

//add box shadow

const Stack = createNativeStackNavigator();

export default function MyStack() {
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
        <Stack.Screen
          name="FrameData"
          component={FrameData}
          options={{
            headerShown: true,
            animation: 'slide_from_bottom',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerRight: () => <HeaderComp />,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
