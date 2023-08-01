import { Text, View, StyleSheet, FlatList } from 'react-native';
import KomboBox from './KomboBox';

export default function StringMoves({ stringAttacks, iconSet }) {
  const renderItem = ({ item, index }) => {
    return (
      <KomboBox
        attack={item}
        iconSet={iconSet}
        style={index % 2 === 0 ? styles.evenItem : styles.oddItem}
        key={index.toString()}
      />
    );
  };

  return (
    <FlatList
      data={stringAttacks}
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
