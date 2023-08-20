import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
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

  const loadAvatar = () => {
    db.transaction((tx) => {
      //Search names
      tx.executeSql(
        'SELECT name, avatar, profile FROM kharacters ORDER BY name ASC',
        null,
        (txObj, resultSet) => {
          setAvatarInfo(resultSet.rows._array);
        }
      );

      tx.executeSql(
        'SELECT name, avatar, profile FROM kameos ORDER BY name ASC',
        null,
        (txObj, resultSet) => {
          setKameoAvatarInfo(resultSet.rows._array);
        }
      );
    });
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  useEffect(() => {
    loadAvatar();
  }, [loading]);

  return (
    <ScrollView style={[globalStyles.color, styles.container]}>
      <Title name={'Lessons'} />
      <View>
        <LessonButtons />
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
