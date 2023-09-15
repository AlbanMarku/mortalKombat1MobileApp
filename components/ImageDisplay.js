import { View, Image } from 'react-native';

export default function ImageDisplay({ source }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Image style={{ minHeight: 200 }} source={{ uri: source }} />
    </View>
  );
}
