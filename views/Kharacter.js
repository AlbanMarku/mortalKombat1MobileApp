import { View, Text, Image } from 'react-native';
import { useContext } from 'react';
import { InputContext } from '../Context';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';

export default function Kharacter({ route, navigation }) {
  const { name, img } = route.params;

  const { input } = useContext(InputContext);

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <Text>I am character page {JSON.stringify(name)}</Text>
        <Image style={{ height: 100 }} source={{ uri: img }} />
        <Text>input is {input}</Text>
      </ScrollView>
      <BottomNav />
    </View>
  );
}
