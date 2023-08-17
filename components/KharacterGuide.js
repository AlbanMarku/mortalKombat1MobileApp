import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';
import OverviewComp from './OverviewComp';
import Title from './Title';
import { db } from '../myDb';

export default function KharacterGuide({ name, profile }) {
  const [strategyInfo, setStrategyInfo] = useState([]);
  const [overviewInfo, setOverviewInfo] = useState(null);
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
              setOverviewInfo(null);
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

  const DisplayPage = () => {
    return (
      <View>
        <Title name={'Overview'} subHeader />
        <MapThroughOverview />
        <Title name={'Strategy'} subHeader />
        <MapThroughStrats />
      </View>
    );
  };

  return (
    <View>
      <Title name={name} />
      <View style={styles.imageDiv}>
        <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
      </View>
      <Title name={'Guide'} underline />
      {fetchComplete && strategyInfo.length > 0 && overviewInfo ? (
        <DisplayPage />
      ) : fetchComplete && strategyInfo.length === 0 && overviewInfo === null ? (
        <View style={styles.noItemDiv}>
          <Text style={{ color: 'white' }}>Kharacter not finished</Text>
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
