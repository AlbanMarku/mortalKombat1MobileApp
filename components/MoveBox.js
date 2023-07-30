import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function MoveBox({ attack, iconSet, style }) {
  const direction = attack.attackInput.direction;
  const input = attack.attackInput.button;
  const name = attack.attackName;
  const attackType = attack.attackType.name;
  const onBlock = attack.blockAdv;
  const startup = attack.startup;

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
    onBlock >= 0 ? styles.green : onBlock <= -1 && onBlock >= -7 ? styles.yellow : styles.red;

  return (
    <View style={[styles.div, style]}>
      <View style={styles.butInfoDiv}>
        <View style={styles.inputDiv}>
          <View style={styles.but}>{directionComp()}</View>
          <View style={styles.but}>{buttonComp()}</View>
        </View>
        <Text style={styles.moveName}>{name}</Text>
      </View>
      <View style={styles.butInfoDiv}>
        <View style={styles.inputDiv}>
          <Text
            style={[styles.data, { marginRight: 20 }, startup <= 9 ? styles.green : styles.white]}
          >
            {startup}
          </Text>
          <Text style={[styles.data, colorStyle]}>{onBlock}</Text>
        </View>
        <Text style={styles.moveName}>{attackType}</Text>
      </View>
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
