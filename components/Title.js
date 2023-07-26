import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function Title({ name }) {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });
  return (
    <View style={style.container}>
      <Text style={{ fontSize: 40, fontFamily: 'mk11' }}>{name}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});