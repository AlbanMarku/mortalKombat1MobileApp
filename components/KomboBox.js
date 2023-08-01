import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import ModalComp from './ModalComp';

export default function KomboBox({ attack, iconSet, style }) {
  const kombo = attack.attackInputs;

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

  const buttonComp = (button) => {
    switch (button) {
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

  const directionComp = (direction) => {
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
      : detailedInfo.blockAdv <= -1 && detailedInfo.blockAdv >= -7
      ? styles.yellow
      : styles.red;

  return (
    <TouchableOpacity style={[styles.div, style]}>
      <View style={styles.buttonInfoContainer}>
        <View style={styles.buttonIconsContainer}>
          {kombo.map((item) => {
            return (
              <View style={styles.input} key={item.key}>
                <View style={styles.but}>{directionComp(item.direction)}</View>
                <View style={styles.but}>{buttonComp(item.button)}</View>
              </View>
            );
          })}
        </View>
        <Text style={styles.moveName}>{detailedInfo.name}</Text>
      </View>

      <View style={styles.dataInfoDiv}>
        <View style={styles.dataDiv}>
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
    alignItems: 'center',
    minWidth: 100,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonIconsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  but: {
    marginRight: 2,
  },
  dataInfoDiv: {
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
