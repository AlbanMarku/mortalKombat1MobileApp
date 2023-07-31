import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function Title({ name, underline }) {
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });
  return (
    <View style={[style.container, underline && style.underline]}>
      <Text style={{ fontSize: 40, fontFamily: 'mk11', color: 'white' }}>{name}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  underline: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
