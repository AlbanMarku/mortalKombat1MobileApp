import { Text, View, StyleSheet } from 'react-native';
import VideoPlayer from './VideoPlayer';
import ParseText from '../styles/ParseText';

export default function StrategyComp({ info, videoUrl, title }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.stratTitle}>{title}</Text>
        <ParseText para={info} />
      </View>
      {videoUrl && <VideoPlayer source={videoUrl} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  stratTitle: {
    color: 'white',
    fontFamily: 'mk11',
    fontSize: 24,
    paddingBottom: 10,
  },
});
