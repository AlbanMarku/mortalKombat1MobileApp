import { View, Text, StyleSheet, FlatList } from 'react-native';
import MoveBox from './MoveBox';

export default function BasicMoves({ basicAttacks, iconSet, renderItem }) {
  return (
    <View>
      <FlatList
        initialNumToRender={3}
        data={basicAttacks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.moveList}
      />
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
