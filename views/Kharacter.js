import { View, Text, Image, StyleSheet } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import MoveBox from '../components/MoveBox';

//use props to populate data. neutral input only render button.

export default function Kharacter({ route, navigation }) {
  const { name, img, profile, basicAttacks } = route.params;

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <Title name={name} />
        <View style={styles.imageDiv}>
          <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
        </View>
        <Title name={'Frame Data'} />
        <View style={styles.moveList}>
          {basicAttacks.map((item, index) => {
            return <MoveBox attack={item} key={index.toString()} />;
          })}
        </View>
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
    backgroundColor: 'red',
  },
});

//  <View>
//             {basicAttacks.map((item) => {
//               const dir = item.attackInput.direction;
//               const but = item.attackInput.button;
//               if (dir == 5) {
//                 return <Text>{but}</Text>;
//               } else {
//                 return (
//                   <Text>
//                     {dir}
//                     {but}
//                   </Text>
//                 );
//               }
//             })}
//           </View>
