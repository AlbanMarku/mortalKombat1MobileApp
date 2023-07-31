import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import ModalComp from './ModalComp';

export default function MoveBox({ attack, iconSet, style }) {
  const direction = attack.attackInput.direction;
  const input = attack.attackInput.button;
  const detailedInfo = {
    name: attack.attackName,
    attackType: attack.attackType.name,
    blockAdv: attack.blockAdv,
    active: attack.active,
    damageBlock: attack.damageBlock,
    startup: attack.startup,
    recovery: attack.recovery,
    cancelAdv: attack.cancelAdv,
    flawlessBlockAdv: attack.flawlessBlockAdv,
    damageHit: attack.damageHit,
    hitAdv: attack.hitAdv,
    airOk: attack.airOk,
  };

  //Clean up code. Make div names clearer.

  const [openModal, setOpenModal] = useState(false);

  const buttonComp = () => {
    switch (input) {
      case 1:
        return iconSet.fp;
      case 2:
        return iconSet.bp;
      case 3:
        return iconSet.fk;
      case 4:
        return iconSet.bk;
    }
  };

  const directionComp = () => {
    switch (direction) {
      case 4:
        return <Entypo name="arrow-bold-left" size={32} color="white" />;

      case 6:
        return <Entypo name="arrow-bold-right" size={32} color="white" />;

      case 2:
        return <Entypo name="arrow-bold-down" size={32} color="white" />;

      default:
        return null;
    }
  };

  const colorStyle =
    detailedInfo.blockAdv >= 0
      ? styles.green
      : detailedInfo.onBlock <= -1 && detailedInfo.onBlock >= -7
      ? styles.yellow
      : styles.red;

  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={openModal}>
        <View style={styles.modal}>
          <ModalComp detailedInfo={detailedInfo} setOpenModal={setOpenModal} />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setOpenModal(true)} style={[styles.div, style]}>
        <View style={styles.butInfoDiv}>
          <View style={styles.inputDiv}>
            <View style={styles.but}>{directionComp()}</View>
            <View style={styles.but}>{buttonComp()}</View>
          </View>
          <Text style={styles.moveName}>{detailedInfo.name}</Text>
        </View>
        <View style={styles.butInfoDiv}>
          <View style={styles.inputDiv}>
            <Text
              style={[
                styles.data,
                { marginRight: 20 },
                detailedInfo.startup <= 9 ? styles.green : styles.white,
              ]}
            >
              {detailedInfo.startup}
            </Text>
            <Text style={[styles.data, colorStyle]}>{detailedInfo.blockAdv}</Text>
          </View>
          <Text style={styles.moveName}>{detailedInfo.attackType}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  butInfoDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 80,
  },
  inputDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  but: {
    marginRight: 2,
  },
  moveName: {
    fontSize: 18,
    marginTop: 5,
    color: 'white',
  },
  data: {
    fontSize: 24,
    color: 'white',
  },
  modal: {
    marginTop: 'auto',
    minHeight: 300,
    height: '30%',
  },
  green: {
    color: 'green',
  },
  black: {
    color: 'black',
  },
  yellow: {
    color: 'orange',
  },
  red: {
    color: 'red',
  },
});
