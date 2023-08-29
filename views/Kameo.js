import { View, ScrollView } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { globalStyles } from '../styles/global';
import { useState, useEffect } from 'react';
import KharacterGuide from '../components/KharacterGuide';
import { db } from '../myDb';

export default function Kameo({ route, navigation }) {
  const { name, profile } = route.params;

  const [moves, setMoves] = useState([]);

  const fetchAttackData = async () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT moves FROM kameos WHERE name = ?',
          [name],
          (txObj, resultSet) => {
            console.log('FETCHED');
            const queriedAttacks = resultSet.rows.item(0);

            const parsedMoves = JSON.parse(queriedAttacks.moves);
            setMoves(parsedMoves);
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
        <KharacterGuide name={name} profile={profile} type={'kameo'} />
      </ScrollView>
      <BottomNav basicAttacks={moves} kameo />
    </View>
  );
}
