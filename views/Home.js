import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import Avatar from '../components/Avatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

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
          const avatarPromises = avatarArray.map(async (item) => {
            const profileAsset = await Asset.fromURI(item.profile).downloadAsync();
            return {
              name: item.name,
              avatar: item.avatar,
              profile: profileAsset.localUri,
            };
          });
          const updatedAvatarInfo = await Promise.all(avatarPromises);
          setAvatarInfo(updatedAvatarInfo); //figure out promises
        }
      );

      tx.executeSql(
        'SELECT name, avatar, profile FROM kameos ORDER BY name ASC',
        null,
        async (txObj, resultSet) => {
          const kameoArray = resultSet.rows._array;
          const avatarPromises = kameoArray.map(async (item) => {
            const profileAsset = await Asset.fromURI(item.profile).downloadAsync();
            return {
              name: item.name,
              avatar: item.avatar,
              profile: profileAsset.localUri,
            };
          });
          const updatedAvatarInfo = await Promise.all(avatarPromises);
          setKameoAvatarInfo(updatedAvatarInfo);
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

            const newBeg = p.beginner.map(async (item) => {
              const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
              return {
                ...item,
                adviceThumbnail: cacheThumb.localUri,
              };
            });
            const newInt = p.intermediate.map(async (item) => {
              const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
              return {
                ...item,
                adviceThumbnail: cacheThumb.localUri,
              };
            });
            const newAdv = p.advance.map(async (item) => {
              const cacheThumb = await Asset.fromURI(item.adviceThumbnail).downloadAsync();
              return {
                ...item,
                adviceThumbnail: cacheThumb.localUri,
              };
            });

            const updatedBeg = await Promise.all(newBeg);
            const updatedInt = await Promise.all(newInt);
            const updatedAdv = await Promise.all(newAdv);
            const finalLessonObj = {
              beginner: updatedBeg,
              intermediate: updatedInt,
              advance: updatedAdv,
            };
            setMylessons(finalLessonObj);
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
    <ScrollView style={[globalStyles.color, styles.container]}>
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
