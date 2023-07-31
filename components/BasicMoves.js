import { View, Text, StyleSheet } from 'react-native';
import MoveBox from './MoveBox';

export default function BasicMoves({ basicAttacks, iconSet }) {
  return (
    <View style={styles.moveList}>
      {basicAttacks.map((item, index) => {
        return (
          <MoveBox
            attack={item}
            iconSet={iconSet}
            style={index % 2 === 0 ? styles.evenItem : styles.oddItem}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  moveList: {
    marginBottom: 50,
  },
  evenItem: {
    backgroundColor: '#333232',
  },
  oddItem: {
    backgroundColor: '#4a4949',
  },
});
