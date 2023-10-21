import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useState, useContext } from 'react';
import ModalComp from './ModalComp';
import { MyContext } from '../Context';

export default function MoveBox({ attack, iconSet, style }) {
  const [input, setInput, rosterData, setRosterData, getIcon, getButton] = useContext(MyContext);

  //Grab attackinputs array form the attack prop. Grab attack properties. Map through attackinputs array to display in div. In depth stats passed as props to modal.
  const kombo = attack.attackInputs ?? [
    { button: 8, direction: 2 },
    { button: 8, direction: 2 },
  ];
  const [openModal, setOpenModal] = useState(false);

  const detailedInfo = {
    name: attack.attackName ?? 'Undefined',
    attackType: attack.attackType?.name ?? 'Undefined',
    blockAdv: attack.blockAdv ?? '--',
    active: attack.active ?? '--',
    damageBlock: attack.damageBlock ?? 0,
    startup: attack.startup ?? '--',
    recovery: attack.recovery ?? 0,
    cancelAdv: attack.cancelAdv ?? 0,
    flawlessBlockAdv: attack.flawlessBlockAdv ?? '--',
    damageHit: attack.damageHit ?? 0,
    hitAdv: attack.hitAdv ?? '--',
    airOk: attack.airOk ?? false,
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

      case 9:
        return (
          <Image style={{ width: 25, height: 25 }} source={require('../assets/imgs/JUMP.png')} />
        );

      default:
        return null;
    }
  };

  //If a the block/startup adv value is a certain range, apply color style.

  let colorStyleBlockAdv;

  if (!isNaN(detailedInfo.blockAdv)) {
    colorStyleBlockAdv =
      detailedInfo.blockAdv >= 0
        ? styles.green
        : detailedInfo.blockAdv <= -1 && detailedInfo.blockAdv >= -7
        ? styles.yellow
        : styles.red;
  } else {
    colorStyleBlockAdv = styles.white;
  }

  let colorStyleBlockAdvStartup;

  if (!isNaN(detailedInfo.startup)) {
    detailedInfo.startup <= 9 ? styles.green : styles.white;
  } else {
    colorStyleBlockAdvStartup = styles.white;
  }

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
              {detailedInfo.startup || 0}
            </Text>
            <Text style={[styles.data, colorStyleBlockAdv]}>{detailedInfo.blockAdv}</Text>
          </View>
          <Text style={styles.moveName}>{detailedInfo.attackType || 'undefined'}</Text>
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
    width: 80,
    justifyContent: 'space-between',
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
  white: {
    color: 'white',
  },
});
