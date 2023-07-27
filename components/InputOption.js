import { View, Text, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useContext } from 'react';
import { InputContext } from '../Context';

export default function InputOption() {
  const { input, setInput } = useContext(InputContext);

  const handleInput = (selectedInput) => {
    setInput(selectedInput);
  };

  return (
    <View>
      <Menu>
        <MenuTrigger children={<Ionicons name="ios-game-controller" size={30} color="white" />} />
        <MenuOptions>
          <MenuOption
            onSelect={() => handleInput(0)}
            children={
              <View style={styles.inputDiv}>
                <Text>Universal</Text>
                <Octicons name="number" size={24} color="black" />
              </View>
            }
          />
          <MenuOption
            onSelect={() => handleInput(1)}
            children={
              <View style={styles.inputDiv}>
                <Text>Playstation</Text>
                <FontAwesome5 name="playstation" size={24} color="black" />
              </View>
            }
          />
          <MenuOption
            onSelect={() => handleInput(2)}
            children={
              <View style={styles.inputDiv}>
                <Text>Xbox</Text>
                <FontAwesome5 name="xbox" size={24} color="black" />
              </View>
            }
          />
          <MenuOption
            onSelect={() => handleInput(3)}
            children={
              <View style={styles.inputDiv}>
                <Text>Nintendo</Text>
                <MaterialCommunityIcons name="nintendo-switch" size={24} color="black" />
              </View>
            }
          />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  inputDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 3,
  },
});
