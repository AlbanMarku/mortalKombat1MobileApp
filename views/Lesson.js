import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import VideoPlayer from '../components/VideoPlayer';
import Title from '../components/Title';
const Lesson = ({ route, navigation }) => {
  const { adviceContent, adviceTitle } = route.params;
  console.log(adviceContent);

  const AdviceSection = ({ name, text, videoText, video }) => {
    return (
      <View>
        <Title name={name} subHeader />
        <View style={{ backgroundColor: 'red' }}>
          <Text style={styles.adviceText}>{text}</Text>
          {videoText ? <Text style={styles.adviceText}>{videoText}</Text> : null}
        </View>
        {video && (
          <View style={{ backgroundColor: 'red' }}>
            <VideoPlayer source={video} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
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
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  adviceText: {
    color: 'white',
  },
});
