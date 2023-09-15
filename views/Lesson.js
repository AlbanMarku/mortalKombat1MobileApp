import { View, Text, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import VideoPlayer from '../components/VideoPlayer';
import ImageDisplay from '../components/ImageDisplay';
import Title from '../components/Title';
import ParseText from '../styles/ParseText';
import { ScrollView } from 'react-native-gesture-handler';

const Lesson = ({ route, navigation }) => {
  const { adviceContent, adviceTitle } = route.params;
  console.log(adviceContent);

  const AdviceSection = ({ name, text, videoText, video, imageText, image }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Title name={name} subHeader />
        <View style={{}}>
          <ParseText para={text} />
        </View>
        {video && (
          <View style={{}}>
            <VideoPlayer source={video} />
            {videoText ? <Text style={styles.adviceText}>{videoText}</Text> : null}
          </View>
        )}
        {image && (
          <View style={{}}>
            <ImageDisplay source={image} />
            {imageText ? <Text style={styles.adviceText}>{imageText}</Text> : null}
          </View>
        )}
      </View>
    );
  };
  return (
    <ScrollView style={[globalStyles.color]}>
      <Title name={adviceTitle} underline />
      {adviceContent.map((item, index) => {
        return (
          <AdviceSection
            key={index.toString()}
            name={item.adviceHeader}
            text={item.adviceText}
            videoText={item.videoDescription || null}
            video={item.videoUrl}
            imageText={item.imageDescription || null}
            image={item.imageUrl}
          />
        );
      })}
    </ScrollView>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  adviceText: {
    color: 'grey',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
