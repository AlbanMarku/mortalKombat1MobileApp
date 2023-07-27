import { StyleSheet, Modal, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { InputContext } from '../Context';

export default function HeaderComp() {
  const { input, setInput } = useContext(InputContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleInput = () => {
    setIsVisible(!isVisible);
  }; //set all like this for funcs

  return (
    <View style={styles.header}>
      <Modal animationType="slide" visible={isVisible}></Modal>
      <Ionicons name="ios-game-controller" size={30} color="white" onPress={handleInput} />
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
