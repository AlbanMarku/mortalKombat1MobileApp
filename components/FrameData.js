import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import MoveBox from './MoveBox';
import Title from './Title';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';
import { ScrollView } from 'react-native-gesture-handler';
import BasicMoves from './BasicMoves';

export default function BasicAttacks({ basicAttacks }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const [dataPage, setDataPage] = useState(0);
  const iconSet = getIcon(input);

  return (
    <View>
      <Title name={'Frame Data'} />
      <ScrollView horizontal style={{ backgroundColor: 'red' }}>
        <TouchableOpacity>
          <Text>Item</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Item</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.moveList}>
        <BasicMoves basicAttacks={basicAttacks} iconSet={iconSet} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
