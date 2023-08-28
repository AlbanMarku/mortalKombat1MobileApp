import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav({ basicAttacks, stringAttacks, specialAttacks }) {
  //Navbar comp with on click that navigates to screens. Drills attack info to FrameData screen.
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('FrameData', { basicAttacks, stringAttacks, specialAttacks })
      }
      style={styles.bar}
    >
      <Text style={styles.text}>Frame Data</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: 'white',
    fontFamily: 'mk11',
    fontSize: 18,
  },
});
