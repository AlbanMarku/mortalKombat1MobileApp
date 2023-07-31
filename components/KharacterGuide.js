import { View, Text } from 'react-native';
import Title from './Title';
import { ScrollView } from 'react-native-gesture-handler';

export default function KharacterGuide() {
  return (
    <ScrollView style={{ height: 1000, backgroundColor: 'red' }}>
      <Title name={'Guide'} />
      <Text>I am the guide page yippy</Text>
    </ScrollView>
  );
}
