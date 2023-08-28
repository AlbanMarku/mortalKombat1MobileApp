import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import VideoPlayer from '../components/VideoPlayer';
import Title from '../components/Title';
import ParseText from '../styles/ParseText';
import { ScrollView } from 'react-native-gesture-handler';
const Lesson = ({ route, navigation }) => {
  const { adviceContent, adviceTitle } = route.params;
  console.log(adviceContent);

  const AdviceSection = ({ name, text, videoText, video }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Title name={name} subHeader />
        <View style={{}}>
          <ParseText para={text} />
          {videoText ? <Text style={styles.adviceText}>{videoText}</Text> : null}
        </View>
        {video && (
          <View style={{}}>
            <VideoPlayer source={video} />
          </View>
        )}
      </View>
    );
  };
  return (
    <ScrollView style={[globalStyles.color]}>
      <Title name={adviceTitle} />
      {adviceContent.map((item, index) => {
        return (
          <AdviceSection
            key={index.toString()}
            name={item.adviceHeader}
            text={item.adviceText}
            videoText={item.videoDescription || null}
            video={item.videoUrl}
          />
        );
      })}
    </ScrollView>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  adviceText: {
    color: 'white',
  },
});
