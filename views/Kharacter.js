import { View, Text } from 'react-native';
export default function Kharacter({ route, navigation }) {
  const { name } = route.params;
  return (
    <View>
      <Text>I am character page {JSON.stringify(name)}</Text>
    </View>
  );
}
