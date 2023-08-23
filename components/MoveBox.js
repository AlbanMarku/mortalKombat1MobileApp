import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useState, useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import ModalComp from './ModalComp';
import { MyContext } from '../Context';

export default function MoveBox({ attack, iconSet, style }) {
  const [input, setInput, rosterData, setRosterData, getIcon, getButton] = useContext(MyContext);

  //Grab attackinputs array form the attack prop. Grab attack properties. Map through attackinputs array to display in div. In depth stats passed as props to modal.
  const kombo = attack.attackInputs;
  const [openModal, setOpenModal] = useState(false);

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

  const directionComp = (direction) => {
    //Direction uses numpad notation. Return icon depending on number.
    switch (direction) {
      case 4:
        return (
          <Image style={{ width: 25, height: 25 }} source={require('../assets/imgs/LEFT.png')} />
        );
      case 6:
        return (
          <Image style={{ width: 25, height: 25 }} source={require('../assets/imgs/RIGHT.png')} />
        );

      case 2:
        return (
          <Image style={{ width: 25, height: 25 }} source={require('../assets/imgs/DOWN.png')} />
        );

      case 8:
        return (
          <Image style={{ width: 25, height: 25 }} source={require('../assets/imgs/UP.png')} />
        );

      default:
        return null;
    }
  };

  //If a the block/startup adv value is a certain range, apply color style.

  const colorStyleBlockAdv =
    detailedInfo.blockAdv >= 0
      ? styles.green
      : detailedInfo.blockAdv <= -1 && detailedInfo.blockAdv >= -7
      ? styles.yellow
      : styles.red;

  const colorStyleBlockAdvStartup = detailedInfo.startup <= 9 ? styles.green : styles.white;

  return (
    <View>
      <Modal
        onRequestClose={() => setOpenModal(false)}
        transparent={true}
        animationType="slide"
        visible={openModal}
      >
        <View style={styles.modal}>
          <ModalComp detailedInfo={detailedInfo} setOpenModal={setOpenModal} />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setOpenModal(true)} style={[styles.div, style]}>
        <View style={styles.buttonInfoContainer}>
          <View style={styles.buttonIconsContainer}>
            {kombo.map((item) => {
              //clean up this conditional render.
              return (
                <View style={styles.input} key={item._key}>
                  {item.direction === 5 ? null : (
                    <View style={styles.but}>{directionComp(item.direction)}</View>
                  )}
                  {item.button === 0 ? null : getButton(item.button, iconSet)}
                </View>
              );
            })}
          </View>
          <Text style={styles.moveName}>{detailedInfo.name}</Text>
        </View>

        <View style={styles.dataInfoContainer}>
          <View style={styles.dataDiv}>
            <Text style={[styles.data, colorStyleBlockAdvStartup, { marginRight: 25 }]}>
              {detailedInfo.startup}
            </Text>
            <Text style={[styles.data, colorStyleBlockAdv]}>{detailedInfo.blockAdv}</Text>
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
  buttonInfoContainer: {
    justifyContent: 'center',
    minWidth: 100,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonIconsContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  but: {
    marginRight: 5,
    color: 'white',
  },
  dataInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 80,
  },
  dataDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
