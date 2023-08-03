import { Text, ScrollView } from 'react-native';
import Title from './Title';
import VideoPlayer from './VideoPlayer';

export default function KharacterGuide() {
  return (
    <ScrollView style={{}}>
      <Title name={'Guide'} underline />
      <VideoPlayer source={'https://thumbs.gfycat.com/RemoteMeekHornedviper-mobile.mp4'} />
    </ScrollView>
  );
}
