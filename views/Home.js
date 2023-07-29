import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import KharacterAvatar from '../components/KharacterAvatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { InputContext } from '../Context';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation }) {
  const [input, setInput, tempImg] = useContext(InputContext);

  const tempKameo = [
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/frost/thumb-p.png',
    },
  ];

  return (
    <ScrollView style={[globalStyles.color, styles.container]}>
      <Title name={'Lessons'} />
      <View>
        <LessonButtons />
      </View>
      <Title name={'Kharacters'} />
      <View style={styles.columnContainer}>
        {tempImg.map((item, index) => (
          <KharacterAvatar
            key={index.toString()}
            img={item.img}
            name={item.name ? item.name : 'unknown name'}
          />
        ))}
      </View>
      <Title name={'Kameos'} />
      <View>
        <View style={styles.columnContainer}>
          {tempKameo.map((item, index) => (
            <KharacterAvatar key={index.toString()} img={item.img} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonArea: {},
  container: {
    flex: 1,
  },
  boxContainer: {
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
