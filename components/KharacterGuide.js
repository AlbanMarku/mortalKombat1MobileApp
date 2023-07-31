import { Text, ScrollView } from 'react-native';
import Title from './Title';

export default function KharacterGuide() {
  return (
    <ScrollView style={{ height: 1000, backgroundColor: 'red' }}>
      <Title name={'Guide'} />
      <Text>I am the guide page yippy</Text>
    </ScrollView>
  );
}
