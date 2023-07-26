import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ClickBox from '../components/ClickBox';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';

export default function Home({ navigation }) {
  const tempData = [
    { title: 'Basics', key: 1 },
    { title: 'Intermediate', key: 2 },
    { title: 'Advanced', key: 3 },
  ];

  return (
    <View style={[globalStyles.color, styles.container]}>
      <Title name={'Lessons'} />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'center' }}
        contentContainerStyle={styles.buttonArea}
        data={tempData}
        renderItem={({ item }) => <ClickBox title={item.title} />}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonArea: {},
  container: {
    flex: 1,
  },
});
