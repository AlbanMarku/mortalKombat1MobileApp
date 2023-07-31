import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import MoveBox from './MoveBox';
import Title from './Title';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';
import { ScrollView } from 'react-native-gesture-handler';
import BasicMoves from './BasicMoves';
import StringMoves from './StringMoves';
import SpecialMoves from './SpecialMoves';
import { globalStyles } from '../styles/global';

export default function BasicAttacks({ route, navigation }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const [dataPage, setDataPage] = useState(0);
  const iconSet = getIcon(input);
  const { basicAttacks } = route.params;

  const handlePress = (pageValue) => {
    setDataPage(pageValue);
  };

  return (
    <View style={globalStyles.color}>
      <Title name={'Frame Data'} />
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handlePress(0)}>
          <Text style={[styles.optionText, dataPage === 0 && styles.selectedOption]}>Buttons</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(1)}>
          <Text style={[styles.optionText, dataPage === 1 && styles.selectedOption]}>Strings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(2)}>
          <Text style={[styles.optionText, dataPage === 2 && styles.selectedOption]}>Specials</Text>
        </TouchableOpacity>
      </View>
      <View>
        {dataPage === 0 ? (
          <BasicMoves basicAttacks={basicAttacks} iconSet={iconSet} />
        ) : dataPage === 1 ? (
          <StringMoves />
        ) : dataPage === 2 ? (
          <SpecialMoves />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
  },
  selectedOption: {
    color: 'orange',
  },
});
