import { StyleSheet, View } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import KharacterAvatar from '../components/KharacterAvatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';

import { db, setupDb } from '../myDb';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation }) {
  const [input, setInput, rosterData, setRosterData] = useContext(MyContext);
  const [avatarInfo, setAvatarInfo] = useState([]);

  const loadAvatar = () => {
    db.transaction((tx) => {
      //Search names
      tx.executeSql('SELECT name, avatar, profile FROM kharacters', null, (txObj, resultSet) => {
        setAvatarInfo(resultSet.rows._array);
      });
    });
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  useEffect(() => {
    loadAvatar();
  }, [rosterData]);

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
        {avatarInfo.map((item, index) => (
          <KharacterAvatar
            key={index.toString()}
            img={item.avatar}
            name={item.name ? item.name : 'unknown name'}
            profile={item.profile}
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
