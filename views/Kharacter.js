import { View, Text, Image } from 'react-native';
import { useContext } from 'react';
import { InputContext } from '../Context';

export default function Kharacter({ route, navigation }) {
  const { name, img } = route.params;

  const { input } = useContext(InputContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>I am character page {JSON.stringify(name)}</Text>
      <Image style={{ height: 100 }} source={{ uri: img }} />
      <Text>input is {input}</Text>
    </View>
  );
}
