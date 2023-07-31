import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StatBox from './StatBox';

//Make so modal closes click outside.

export default function ModalComp({ setOpenModal, detailedInfo }) {
  const handlePress = () => {
    setOpenModal(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.bar}>
            <Text>{detailedInfo.name}</Text>
            <AntDesign style={styles.arrow} name="down" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.dataRow}>
          <StatBox name={'Damage'} stat={detailedInfo.damageHit} />
          <StatBox name={'Block Damage'} stat={detailedInfo.damageBlock} />
          <StatBox name={'Attack Type'} stat={detailedInfo.attackType} />
        </View>
        <View style={styles.bar}>
          <Text>{'Frame Data'}</Text>
        </View>
        <View style={styles.dataRow}>
          <StatBox name={'Start Up'} stat={detailedInfo.startup} />
          <StatBox name={'Active'} stat={detailedInfo.active} />
          <StatBox name={'Recovery'} stat={detailedInfo.recovery} />
        </View>
        <View style={styles.dataRow}>
          <StatBox name={'Cancel Adv'} stat={detailedInfo.cancelAdv} />
          <StatBox name={'Hit Adv'} stat={detailedInfo.hitAdv} />
          <StatBox name={'Block Adv'} stat={detailedInfo.blockAdv} />
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
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
});
