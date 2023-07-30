import { View, Text, StyleSheet, Image } from 'react-native';

export default function MoveBox({ attack, iconSet }) {
  const direction = attack.attackInput.direction;
  const input = attack.attackInput.button;
  const name = attack.attackName;
  const attackType = attack.attackType.name;
  const onBlock = attack.blockAdv;

  const button = () => {
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
  return (
    <View style={styles.div}>
      <View>
        <View>
          <Text>{direction}</Text>
          <View>{button()}</View>
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
});
