import { Text, ScrollView, FlatList, View, StyleSheet, Image } from 'react-native';
import { client } from '../components/SanityClient';
import Title from './Title';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';
import StrategyComp from './StratagyComp';

export default function KharacterGuide({ name, profile }) {
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
    return (
      <View>
        <StrategyComp />
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
      <FlatList
        data={guideInfo.strategy}
        renderItem={renderItem}
        keyExtractor={(arr, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
});
