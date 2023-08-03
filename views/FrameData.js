import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';
import MoveList from '../components/MoveList';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';

export default function FrameData({ route, navigation }) {
  //Conditionally render movelist components. Could be change to horizontal scrollview and render all three movelists at once.
  const { basicAttacks, stringAttacks, specialAttacks } = route.params;
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const [dataPage, setDataPage] = useState(0);
  const iconSet = getIcon(input);

  const handlePress = (pageValue) => {
    setDataPage(pageValue);
  };

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <Title name={'Frame Data'} underline />
      <View style={styles.optionsContainer}>
        <Pressable onPressIn={() => handlePress(0)}>
          <Text style={[styles.optionText, dataPage === 0 && styles.selectedOption]}>Buttons</Text>
        </Pressable>
        <Pressable onPressIn={() => handlePress(1)}>
          <Text style={[styles.optionText, dataPage === 1 && styles.selectedOption]}>Strings</Text>
        </Pressable>
        <Pressable onPressIn={() => handlePress(2)}>
          <Text style={[styles.optionText, dataPage === 2 && styles.selectedOption]}>Specials</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {dataPage === 0 ? (
          <MoveList attacks={basicAttacks} iconSet={iconSet} />
        ) : dataPage === 1 ? (
          <MoveList attacks={stringAttacks} iconSet={iconSet} />
        ) : dataPage === 2 ? (
          <MoveList attacks={specialAttacks} iconSet={iconSet} />
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
