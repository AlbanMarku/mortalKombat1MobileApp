import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kharacter from '../views/Kharacter';
import DrawerStack from './DrawerStack';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerStack} />
      <Stack.Screen name="Kharacter" component={Kharacter} />
    </Stack.Navigator>
  );
}
