import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function openInput() {
  console.log('change input');
}

export default function HeaderComp() {
  return (
    <View style={styles.header}>
      <Ionicons name="ios-game-controller" size={30} color="white" onPress={openInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'white',
    paddingRight: 15,
  },
});
