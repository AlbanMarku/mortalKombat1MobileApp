import { Text, ScrollView } from 'react-native';
import Title from './Title';

export default function KharacterGuide() {
  return (
    <ScrollView style={{}}>
      <Title name={'Guide'} underline />
      <Text>I am the guide page yippy</Text>
    </ScrollView>
  );
}
