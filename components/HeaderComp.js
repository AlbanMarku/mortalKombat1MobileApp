import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { InputContext } from '../Context';

export default function HeaderComp() {
  const { input, setInput } = useContext(InputContext);

  return (
    <View style={styles.header}>
      <Ionicons name="ios-game-controller" size={30} color="white" onPress={() => setInput(1)} />
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
