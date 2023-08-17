import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { client } from '../components/SanityClient';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';
import OverviewComp from './OverviewComp';
import Title from './Title';
import { db } from '../myDb';

export default function KharacterGuide({ name, profile }) {
  const [strategyInfo, setStrategyInfo] = useState([]);
  const [overviewInfo, setOverviewInfo] = useState({});
  const [fetchComplete, setFetchComplete] = useState(false);

  const fetchGuide = () => {
    try {
      setFetchComplete(false);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT guide FROM kharacters WHERE name = ?',
          [name],
          (txObj, resultSet) => {
            console.log('Got guide');
            const queriedGuide = resultSet.rows._array; //clean this up
            const parsedGuide = JSON.parse(queriedGuide[0].guide);
            if (parsedGuide !== null) {
              setStrategyInfo(parsedGuide.strategy);
              setOverviewInfo(parsedGuide.overview);
            } else {
              setStrategyInfo([]);
              setOverviewInfo('Missing overview.');
            }
          },
          (txObj, err) => {
            console.log('FALIED', err);
          }
        );
      });
      setFetchComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGuide();
  }, []);

  const MapThroughStrats = () => {
    const strats = strategyInfo.map((item) => {
      return (
        <StrategyComp
          info={item.strategyInfo}
          title={item.strategyTitle}
          videoUrl={item.videoUrl}
          key={item._key}
        />
      );
    });
    return strats;
  };

  const MapThroughOverview = () => {
    return <OverviewComp overviewObj={overviewInfo} />;
  };

  return (
    <View>
      <Title name={name} />
      <View style={styles.imageDiv}>
        <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
      </View>
      <Title name={'Guide'} underline />
      <Title name={'Overview'} subHeader />
      <MapThroughOverview />
      <Title name={'Strategy'} subHeader />
      {fetchComplete && strategyInfo.length > 0 ? (
        <MapThroughStrats />
      ) : fetchComplete && strategyInfo.length === 0 ? (
        <View style={styles.noItemDiv}>
          <Text style={{ color: 'white' }}>No strats</Text>
        </View>
      ) : (
        <ActivityIndicator color={'white'} size={'large'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
  noItemDiv: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
});
