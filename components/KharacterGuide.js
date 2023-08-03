import { Text, View, StyleSheet, Image } from 'react-native';
import { client } from '../components/SanityClient';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';
import Title from './Title';

export default function KharacterGuide({ name, profile }) {
  const [strategyInfo, setStrategyInfo] = useState([]);

  const fetchGuide = async () => {
    try {
      const queryData = await client.fetch(
        `*[_type == "kharacter" && name == "${name}"][0]{_id, guide}`
      );
      setStrategyInfo(queryData.guide.strategy);
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

  return (
    <View>
      <Title name={name} />
      <View style={styles.imageDiv}>
        <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
      </View>
      <Title name={'Guide'} underline />
      <Title name={'Strategy'} subHeader />
      {strategyInfo.length > 0 ? (
        <MapThroughStrats />
      ) : (
        <View style={styles.noItemDiv}>
          <Text style={{ color: 'white' }}>No strats</Text>
        </View>
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
