import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ClickBox from '../components/ClickBox';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';

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

  return (
    <View style={[globalStyles.color, styles.container]}>
      <View style={{ backgroundColor: 'blue' }}>
        <Title name={'Lessons'} />
      </View>
      <View style={{ backgroundColor: 'yellow' }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'center' }}
          contentContainerStyle={styles.buttonArea}
          data={tempData}
          renderItem={({ item }) => <ClickBox title={item.title} img={item.img} />}
          numColumns={2}
          // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonArea: {},
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
