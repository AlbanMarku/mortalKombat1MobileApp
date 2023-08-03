import { Text, ScrollView, FlatList, View } from 'react-native';
import { client } from '../components/SanityClient';
import Title from './Title';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';

export default function KharacterGuide({ name }) {
  const [guideInfo, setGuideInfo] = useState({});

  const fetchGuide = async () => {
    try {
      const queryData = await client.fetch(
        `*[_type == "kharacter" && name == "${name}"][0]{guide}`
      );
      console.log(queryData.guide);
      setGuideInfo(queryData.guide);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGuide();
  }, []);

  const renderItem = () => {
    return <StrategyComp />;
  };

  return (
    <View>
      <Title name={'Guide'} underline />
      <Title name={'Strategy'} underline />
      <FlatList
        data={guideInfo.strategy}
        renderItem={renderItem}
        keyExtractor={(arr, index) => index.toString()}
      />
    </View>
  );
}
