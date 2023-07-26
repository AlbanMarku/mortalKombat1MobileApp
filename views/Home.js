import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ClickBox from '../components/ClickBox';
import KharacterAvatar from '../components/KharacterAvatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
  const tempData = [
    {
      title: 'Basics',
      img: 'https://www.fightersgeneration.com/nf7/game/mk11/mk11-screenshot-jan2019.jpg',
      key: 1,
    },
    {
      title: 'Intermediate',
      img: 'https://www.fightersgeneration.com/nf7/game/mk11/mk11-screenshot-jan2019.jpg',
      key: 2,
    },
    {
      title: 'Advanced',
      img: 'https://www.fightersgeneration.com/nf7/game/mk11/mk11-screenshot-jan2019.jpg',
      key: 3,
    },
  ];

  const tempImg = [
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
    {
      img: 'https://cdn-prod.mortalkombat.com/roster/scorpion/thumb-p.png',
    },
  ];

  return (
    <ScrollView style={[globalStyles.color, styles.container]}>
      <View>
        <Title name={'Lessons'} />
      </View>
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'center' }}
          contentContainerStyle={styles.buttonArea}
          data={tempData}
          renderItem={({ item }) => <ClickBox title={item.title} img={item.img} />}
          numColumns={2}
        />
      </View>
      <View>
        <Title name={'Kharacters'} />
      </View>
      <View style={styles.columnContainer}>
        {tempImg.map((item, index) => (
          <KharacterAvatar key={index.toString()} img={item.img} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonArea: {},
  container: {
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
