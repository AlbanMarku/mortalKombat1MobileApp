import { Text, View, StyleSheet } from 'react-native';

export default function Title({ name, underline, subHeader }) {
  return (
    <View style={[style.container, underline && style.underline, subHeader && style.align]}>
      <Text style={[!subHeader && style.big, subHeader && style.small]}>{name}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  underline: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  align: {},
  big: {
    fontSize: 40,
    fontFamily: 'mk11',
    color: 'white',
  },
  small: {
    fontSize: 28,
    fontFamily: 'mk11',
    color: 'orange',
  },
});
