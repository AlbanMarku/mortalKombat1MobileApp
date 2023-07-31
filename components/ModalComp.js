import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StatBox from './StatBox';

export default function ModalComp({ setOpenModal, detailedInfo }) {
  const handlePress = () => {
    setOpenModal(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={handlePress}>
          <View style={styles.bar}>
            <Text>{detailedInfo.name}</Text>
            <AntDesign style={styles.arrow} name="down" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <StatBox name={'Damage'} stat={detailedInfo.damageHit} />
          <StatBox name={'Block Damage'} stat={detailedInfo.damageBlock} />
          <StatBox name={'Attack Type'} stat={detailedInfo.attackType} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  bar: {
    backgroundColor: 'white',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
