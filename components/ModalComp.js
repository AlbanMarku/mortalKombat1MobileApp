import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ModalComp({ setOpenModal, detailedInfo }) {
  const handlePress = () => {
    setOpenModal(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.bar}>
          <Text>{detailedInfo.name}</Text>
          <AntDesign style={styles.arrow} name="down" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
  bar: {
    backgroundColor: 'yellow',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
