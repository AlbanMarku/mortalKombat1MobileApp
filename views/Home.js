import { StyleSheet, View, ActivityIndicator } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import Avatar from '../components/Avatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import { db } from '../myDb';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation, loading }) {
  const [avatarInfo, setAvatarInfo] = useState([]);
  const [kameoAvatarInfo, setKameoAvatarInfo] = useState([]);
  const [myLessons, setMylessons] = useState({});

  const loadAvatar = async () => {
    db.transaction((tx) => {
      //Search names
      tx.executeSql(
        'SELECT name, avatar, profile FROM kharacters ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const avatarArray = resultSet.rows._array;
          setAvatarInfo(avatarArray); //figure out promises
        }
      );

      tx.executeSql(
        'SELECT name, avatar, profile FROM kameos ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const kameoArray = resultSet.rows._array;
          setKameoAvatarInfo(kameoArray);
        }
      );
    });
  };

  const loadLessons = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT beginner, intermediate, advance FROM lessons',
        null,
        async (txObj, resultSet) => {
          const extractedLesson = resultSet.rows._array[0];
          try {
            const p = {
              beginner: JSON.parse(extractedLesson.beginner),
              intermediate: JSON.parse(extractedLesson.intermediate),
              advance: JSON.parse(extractedLesson.advance),
            };
            setMylessons(p);
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  };

  useEffect(() => {
    loadAvatar();
    loadLessons();
  }, []);

  useEffect(() => {
    loadAvatar();
    loadLessons();
  }, [loading]);

  return (
    <ScrollView style={[globalStyles.color, { flex: 1 }]}>
      <Title name={'Lessons'} />
      <View>
        {loading ? (
          <ActivityIndicator color={'white'} size={'large'} />
        ) : myLessons === null || myLessons === {} || myLessons === '' ? (
          <Title name={'No data'} />
        ) : (
          <LessonButtons myLessons={myLessons} />
        )}
      </View>
      <Title name={'Kharacters'} />
      <View style={styles.columnContainer}>
        {loading ? (
          <ActivityIndicator color={'white'} size={'large'} />
        ) : (
          avatarInfo.map((item, index) => (
            <Avatar
              key={index.toString()}
              img={item.avatar}
              name={item.name ? item.name : 'unknown name'}
              profile={item.profile}
              type={'kharacter'}
            />
          ))
        )}
      </View>
      <Title name={'Kameos'} />
      <View>
        <View style={styles.columnContainer}>
          {loading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : (
            kameoAvatarInfo.map((item, index) => (
              <Avatar
                key={index.toString()}
                img={item.avatar}
                name={item.name ? item.name : 'unknown name'}
                profile={item.profile}
                type={'kameo'}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonArea: {},
  boxContainer: {
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
