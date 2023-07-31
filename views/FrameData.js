import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';
import BasicMoves from '../components/BasicMoves';
import StringMoves from '../components/StringMoves';
import SpecialMoves from '../components/SpecialMoves';
import { globalStyles } from '../styles/global';

import Title from '../components/Title';

export default function BasicAttacks({ route, navigation }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const [dataPage, setDataPage] = useState(0);
  const iconSet = getIcon(input);
  const { basicAttacks } = route.params;
  useFonts({ mk11: require('../assets/fonts/mk11Reg.otf') });

  const handlePress = (pageValue) => {
    setDataPage(pageValue);
  };

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
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
      <View style={{ flex: 1 }}>
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
    fontFamily: 'mk11',
  },
  selectedOption: {
    color: 'orange',
  },
});
