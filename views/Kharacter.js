import { View, Image, StyleSheet, ScrollView } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import { useState, useEffect } from 'react';
import KharacterGuide from '../components/KharacterGuide';
import { db } from '../myDb';

//Fetch attack info from name query. Props drilled to FrameData screen.

export default function Kharacter({ route, navigation }) {
  const { name, profile } = route.params;

  const [basicAttacks, setBasicAttacks] = useState([]);
  const [stringAttacks, setStringAttacks] = useState([]);
  const [specialAttacks, setSpecialAttacks] = useState([]);

  const fetchAttackData = async () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT basicAttacks, stringAttacks, specialAttacks FROM Kharacters WHERE name = ?',
          [name],
          (txObj, resultSet) => {
            console.log('FETCHED');
            const queriedAttacks = resultSet.rows.item(0);

            const parsedBasicAttacks = JSON.parse(queriedAttacks.basicAttacks);
            const parsedStringAttacks = JSON.parse(queriedAttacks.stringAttacks);
            const parsedSpecialAttacks = JSON.parse(queriedAttacks.specialAttacks);

            setBasicAttacks(parsedBasicAttacks);
            setStringAttacks(parsedStringAttacks);
            setSpecialAttacks(parsedSpecialAttacks);
          },
          (txObj, err) => {
            console.log('FAILED ', err);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttackData();
  }, []);

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <KharacterGuide name={name} profile={profile} />
      </ScrollView>

      <BottomNav
        basicAttacks={basicAttacks}
        stringAttacks={stringAttacks}
        specialAttacks={specialAttacks}
      />
    </View>
  );
}
