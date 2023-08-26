import { StyleSheet, View, Text, ActivityIndicator, Pressable } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import Avatar from '../components/Avatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { db } from '../myDb';
import { ToastAndroid } from 'react-native';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation, loading }) {
  const [avatarInfo, setAvatarInfo] = useState([]);
  const [kameoAvatarInfo, setKameoAvatarInfo] = useState([]);
  const [myLessons, setMyLessons] = useState({});
  const [aLoad, setALoad] = useState(true);
  const [bLoad, setBLoad] = useState(true);

  const loadAvatar = () => {
    setALoad(true);
    setBLoad(true);
    db.transaction((tx) => {
      //Search names
      tx.executeSql(
        'SELECT name, avatar, profile FROM kharacters ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const avatarArray = resultSet.rows._array;
          setAvatarInfo(avatarArray);
          setALoad(false);
        }
      );

      tx.executeSql(
        'SELECT name, avatar, profile FROM kameos ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const kameoArray = resultSet.rows._array;
          console.log(kameoArray);
          ToastAndroid.showWithGravity(
            kameoArray.toString(),
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          setKameoAvatarInfo(kameoArray);
          setBLoad(false);
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
              beginner: await Promise.all(JSON.parse(extractedLesson.beginner)),
              intermediate: await Promise.all(JSON.parse(extractedLesson.intermediate)),
              advance: await Promise.all(JSON.parse(extractedLesson.advance)),
            };
            setMyLessons(p);
          } catch (error) {
            console.log('load lesson error: ', error);
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
    <ScrollView style={[globalStyles.color, styles.container]}>
      <Title name={'Lessons'} />
      <View>
        {loading ? (
          <ActivityIndicator color={'white'} size={'large'} />
        ) : (
          <LessonButtons myLessons={myLessons} />
        )}
      </View>
      <Title name={'Kharacters'} />
      <View style={styles.columnContainer}>
        {aLoad ? (
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
          {bLoad ? (
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
