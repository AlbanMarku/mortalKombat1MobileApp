import { View, Text, Image, StyleSheet } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import MoveBox from '../components/MoveBox';
import { useContext } from 'react';
import { MyContext } from '../Context';

//use props to populate data. neutral input only render button.

export default function Kharacter({ route, navigation }) {
  const { name, img, profile, basicAttacks } = route.params;
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const iconSet = getIcon(input);
  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <Title name={name} />
        <View style={styles.imageDiv}>
          <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
        </View>
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
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
  moveList: {
    minHeight: 400,
  },
  evenItem: {
    backgroundColor: '#1c1b1b',
  },
  oddItem: {
    backgroundColor: '#303030',
  },
});
