import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useContext } from 'react';
import { MyContext } from '../Context';

export default function StrategyComp({ para }) {
  const [input, setInput, rosterData, setRosterData, getIcon, getButton] = useContext(MyContext);
  const iconSet = getIcon(input);

  const ReplaceDir = (direction) => {
    switch (direction.number) {
      case 4:
        return (
          <Image style={{ width: 20, height: 20 }} source={require('../assets/imgs/LEFT.png')} />
        );
      case 6:
        return (
          <Image style={{ width: 20, height: 20 }} source={require('../assets/imgs/RIGHT.png')} />
        );

      case 2:
        return (
          <Image style={{ width: 20, height: 20 }} source={require('../assets/imgs/DOWN.png')} />
        );

      case 8:
        return (
          <Image style={{ width: 20, height: 20 }} source={require('../assets/imgs/UP.png')} />
        );

      default:
        return null;
    }
  };

  const ReplaceBut = (button) => {
    //Attack use NRS notation. Return icon depending on number.
    return getButton(button.number, iconSet);
  };

  const AttackConverter = ({ para }) => {
    const parsedParaArray = para.split(/(\d{2})/g).filter(Boolean);
    //learn fully this.
    return (
      <Text style={styles.infoText}>
        {parsedParaArray.map((substring, index) => {
          if (/^\d{2}$/.test(substring)) {
            const directionNumber = parseInt(substring.charAt(0), 10);
            const buttonNumber = parseInt(substring.charAt(1), 10);
            return (
              <View key={index}>
                <View style={styles.attacksDiv}>
                  <ReplaceDir number={directionNumber} />
                  <ReplaceBut number={buttonNumber} />
                </View>
              </View>
            );
          } else {
            return <Text key={index}>{substring}</Text>;
          }
        })}
      </Text>
    );
  };

  return <AttackConverter para={para} />;
}

const styles = StyleSheet.create({
  infoText: {
    color: 'white',
    fontSize: 16,
  },
  attacksDiv: {
    flexDirection: 'row',
    marginBottom: -5,
  },
});
