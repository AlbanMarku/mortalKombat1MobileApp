import { View, StyleSheet, FlatList } from 'react-native';
import MoveBox from './MoveBox';

export default function BasicMoves({ basicAttacks, iconSet }) {
  const renderItem = ({ item, index }) => (
    <MoveBox
      attack={item}
      iconSet={iconSet}
      style={index % 2 === 0 ? styles.evenItem : styles.oddItem}
      key={index.toString()}
    />
  );
  return (
    <View style={{}}>
      <FlatList
        data={basicAttacks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  moveList: {},
  evenItem: {
    backgroundColor: '#333232',
  },
  oddItem: {
    backgroundColor: '#4a4949',
  },
});
