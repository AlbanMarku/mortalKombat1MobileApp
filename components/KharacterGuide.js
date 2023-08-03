import { Text, ScrollView, FlatList, View, StyleSheet, Image } from 'react-native';
import { client } from '../components/SanityClient';
import Title from './Title';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';

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

  return (
    <View>
      <Title name={name} />
      <View style={styles.imageDiv}>
        <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
      </View>
      <Title name={'Guide'} underline />
      <Title name={'Strategy'} underline />
      {strategyInfo.map((item) => (
        <StrategyComp info={item.strategyInfo} videoUrl={item.videoUrl} key={item._key} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
});
