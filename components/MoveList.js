import { Text, View, StyleSheet, FlatList } from 'react-native';
import MoveBox from './MoveBox';

export default function MoveList({ attacks, iconSet }) {
  //Flatlist through array of attacks. If attacks missing, render no data div instead. Movebox style prop depends on even or odd index.
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

  const DisplayMoveList = () => {
    if (!Array.isArray(attacks) || attacks.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data available.</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={attacks}
          renderItem={renderItem}
          keyExtractor={(arr, index) => index.toString()}
        />
      );
    }
  };

  return <DisplayMoveList />;
}

const styles = StyleSheet.create({
  moveList: {},
  evenItem: {
    backgroundColor: '#333232',
  },
  oddItem: {
    backgroundColor: '#4a4949',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});
