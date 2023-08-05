import { StyleSheet, View } from 'react-native';
import LessonButtons from '../components/LessonButtons';
import KharacterAvatar from '../components/KharacterAvatar';
import Title from '../components/Title';
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context';
import { client, urlFor } from '../components/SanityClient';

import * as SQLite from 'expo-sqlite';

//Some temp data to map through. Components for homescreen.

export default function Home({ navigation }) {
  const [input, setInput, rosterData, setRosterData] = useContext(MyContext);
  const [fetched, setFetched] = useState(false);

  const fetchRoster = async () => {
    //Fetch all karacters. Get their name, avatar, profile image. Map through each khacaracter and create touchable box.
    try {
      const queryData = await client.fetch(
        " *[_type == 'kharacter']{ _id,name, avatar, profile, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}}"
      );
      const extractedData = queryData.map((item) => {
        const parsedAvatarImg = urlFor(item.avatar.asset._ref);
        const parsedProfileImg = urlFor(item.profile.asset._ref);
        return {
          name: item.name,
          img: parsedAvatarImg.url(),
          profile: parsedProfileImg.url(),
          basicAttacks: item.basicAttacks,
          stringAttacks: item.stringAttacks,
          specialAttacks: item.specialAttacks,
        };
      });
      setRosterData(extractedData);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const db = SQLite.openDatabase('main.db');

  useEffect(() => {
    fetchRoster();

    if (fetched) {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS kharacters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, avatar TEXT, profile TEXT, basicAttacks TEXT, stringAttacks TEXT, specialAttacks TEXT)'
        );
      });

      db.transaction((tx) => {
        const insertQuery = `INSERT INTO kharacters (id, name, avatar, profile , basicAttacks, stringAttacks, specialAttacks) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        rosterData.forEach((kharacter) => {
          const { _id, name, avatar, profile, basicAttacks, stringAttacks, specialAttacks } =
            kharacter;

          const basicAttacksJSON = JSON.stringify(basicAttacks);
          const stringAttacksJSON = JSON.stringify(stringAttacks);
          const specialAttacksJSON = JSON.stringify(specialAttacks);
          tx.executeSql(
            insertQuery,
            [_id, name, avatar, profile, basicAttacksJSON, stringAttacksJSON, specialAttacksJSON],
            (txObj, resultSet) => {
              console.log(resultSet);
            }
          );
        });
      });

      db.transaction((tx) => {
        tx.executeSql('SELECT name FROM kharacters', null);
      });
    }
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
      {/* <View style={styles.columnContainer}>
        {rosterData.map((item, index) => (
          <KharacterAvatar
            key={index.toString()}
            img={item.img}
            name={item.name ? item.name : 'unknown name'}
            profile={item.profile}
          />
        ))}
      </View> */}
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
