import { View, ScrollView, StyleSheet } from 'react-native';
import MoveBox from './MoveBox';
import Title from './Title';
import { useContext } from 'react';
import { MyContext } from '../Context';

export default function BasicAttacks({ basicAttacks }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const iconSet = getIcon(input);

  return (
    <View>
      <Title name={'Frame Data'} />
      <ScrollView nestedScrollEnabled style={styles.moveList}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  moveList: {
    flex: 1,
  },
  evenItem: {
    backgroundColor: '#333232',
  },
  oddItem: {
    backgroundColor: '#4a4949',
  },
});
