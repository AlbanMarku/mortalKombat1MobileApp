import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MoveBox({ attack, iconSet }) {
  const direction = attack.attackInput.direction;
  const input = attack.attackInput.button;
  const name = attack.attackName;
  const attackType = attack.attackType.name;
  const onBlock = attack.blockAdv;

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
        return <FontAwesome5 name="arrow-left" size={24} color="white" />;

      case 6:
        return <FontAwesome5 name="arrow-right" size={24} color="white" />;

      case 2:
        return <FontAwesome5 name="arrow-down" size={24} color="white" />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.div}>
      <View>
        <View style={styles.inputDiv}>
          <View>{directionComp()}</View>
          <View>{buttonComp()}</View>
        </View>
        <Text>{name}</Text>
      </View>
      <View>
        <Text>{onBlock}</Text>
        <Text>{attackType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    backgroundColor: 'green',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputDiv: {
    flexDirection: 'row',
  },
});
