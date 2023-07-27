import { View, Text, Image } from 'react-native';
export default function Kharacter({ route, navigation }) {
  const { name, img } = route.params;
  console.log(JSON.stringify(img));
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>I am character page {JSON.stringify(name)}</Text>
      <Image style={{ height: 100 }} source={{ uri: img }} />
    </View>
  );
}
