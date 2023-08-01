import { Text, View, StyleSheet, FlatList } from 'react-native';
import MoveBox from './MoveBox';

export default function MoveList({ attacks, iconSet }) {
  const renderItem = ({ item, index }) => {
    return (
      <MoveBox
        attack={item}
        iconSet={iconSet}
        style={index % 2 === 0 ? styles.evenItem : styles.oddItem}
        key={index.toString()}
      />
    );
  };

  return (
    <FlatList
      data={attacks}
      renderItem={renderItem}
      keyExtractor={(arr, index) => index.toString()}
    />
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
