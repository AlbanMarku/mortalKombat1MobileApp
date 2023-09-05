import { Text, View, StyleSheet, Linking, Pressable } from 'react-native';
import { globalStyles } from '../styles/global';

export default function About() {
  return (
    <View style={[globalStyles.color, styles.container]}>
      <Text style={{ color: 'white', fontSize: 26, textAlign: 'center', lineHeight: 35 }}>
        Want to <Text style={{ color: 'orange', fontFamily: 'mk11' }}>kontribute</Text>? Drop me an
        email with your knowledge of the game!
      </Text>
      <Pressable
        style={{
          backgroundColor: 'orange',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
        onPress={() => Linking.openURL('mailto:albanmarku@outlook.com')}
      >
        <Text style={{ fontFamily: 'mk11', fontSize: 18 }}>Send an email</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
