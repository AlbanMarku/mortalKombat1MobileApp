import { View, StyleSheet, Modal, Text } from 'react-native';
import MoveBox from './MoveBox';
import Title from './Title';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';

export default function BasicAttacks({ basicAttacks }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const iconSet = getIcon(input);

  return (
    <View>
      <Title name={'Frame Data'} />
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
