import { StyleSheet, View } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import KharacterAvatar from '../components/KharacterAvatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect } from 'react';
import { MyContext } from '../Context';
import { client, urlFor } from '../components/SanityClient';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation }) {
  const [input, setInput, rosterData, setRosterData] = useContext(MyContext);

  const fetchRoster = async () => {
    try {
      const queryData = await client.fetch("*[_type == 'kharacter']{ _id, name, avatar }");
      const extractedData = queryData.map((item) => {
        const parsedImg = urlFor(item.avatar.asset._ref);
        return { name: item.name, img: parsedImg.url() };
      });
      setRosterData(extractedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

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
        {rosterData.map((item, index) => (
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
