import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';
import OverviewComp from './OverviewComp';
import Title from './Title';
import { db } from '../myDb';

//clean this garbage page up. Repetitive code.

export default function KharacterGuide({ name, profile, type }) {
  const [strategyInfo, setStrategyInfo] = useState([]);
  const [overviewInfo, setOverviewInfo] = useState(null);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [kameoStrategyInfo, setKameoStrategyInfo] = useState([]);
  const [kameoOverviewInfo, setKameoOverviewInfo] = useState(null);

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

  const fetchKameoGuide = () => {
    try {
      setFetchComplete(false);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT guide FROM kameos WHERE name = ?',
          [name],
          (txObj, resultSet) => {
            const queriedGuide = resultSet.rows._array;
            const parsedGuide = JSON.parse(queriedGuide[0].guide);
            if (parsedGuide !== null) {
              setKameoStrategyInfo(parsedGuide.strategy);
              setKameoOverviewInfo(parsedGuide.overview);
            } else {
              setKameoStrategyInfo([]);
              setOverviewInfo(null);
            }
          },
          (txObj, err) => {
            console.log(err);
          }
        );
      });
      setFetchComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (type === 'kharacter') {
      fetchGuide();
    } else if (type === 'kameo') {
      fetchKameoGuide();
    }
  }, []);

  const MapThroughStrats = () => {
    if (type === 'kharacter') {
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
    } else {
      const strats = kameoStrategyInfo.map((item) => {
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
    }
  };

  const DisplayKharacterPage = () => {
    return (
      <View>
        <Title name={'Overview'} subHeader />
        <OverviewComp overviewObj={overviewInfo} />
        <Title name={'Strategy'} subHeader />
        <MapThroughStrats />
      </View>
    );
  };

  const DisplayKameoPage = () => {
    return (
      <View>
        <Title name={'Kameo Overview'} />
        <OverviewComp overviewObj={kameoOverviewInfo} />
        <Title name={'Kameo Strategy'} />
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
      {type === 'kharacter' ? ( // Render different comps depending if khar or kameo.
        fetchComplete && strategyInfo.length > 0 && overviewInfo ? (
          <DisplayKharacterPage />
        ) : fetchComplete && strategyInfo.length === 0 && overviewInfo === null ? (
          <View style={styles.noItemDiv}>
            <Text style={{ color: 'white' }}>Kharacter not finished</Text>
          </View>
        ) : (
          <ActivityIndicator color={'white'} size={'large'} />
        )
      ) : type === 'kameo' ? (
        fetchComplete && kameoStrategyInfo.length > 0 && kameoOverviewInfo ? (
          <DisplayKameoPage />
        ) : fetchComplete && strategyInfo.length === 0 && overviewInfo === null ? (
          <View style={styles.noItemDiv}>
            <Text style={{ color: 'white' }}>Kharacter not finished</Text>
          </View>
        ) : (
          <ActivityIndicator color={'white'} size={'large'} />
        )
      ) : null}
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
