import { View, Text, StyleSheet } from 'react-native';

export default function MoveBox({ attack }) {
  const direction = attack.attackInput.direction;
  const input = attack.attackInput.button;
  const name = attack.attackName;
  const attackType = attack.attackType.name;
  const onBlock = attack.blockAdv;
  return (
    <View style={styles.div}>
      <View>
        <Text>
          {direction !== 5 ? direction : null}
          {input}
        </Text>
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
