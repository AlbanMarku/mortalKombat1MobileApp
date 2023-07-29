import { View, Text, Image, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { InputContext } from '../Context';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { client, urlFor } from '../components/SanityClient';

export default function Kharacter({ route, navigation }) {
  setupURLPolyfill();
  console.log('run');

  const { name, img } = route.params;
  console.log(name);
  console.log(img);

  const [tempImger, setTempImger] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png'
  );

  const [tempNamer, setTempNamer] = useState('Kharacter');

  const getDetails = async () => {
    try {
      const posts = await client.fetch("*[_type == 'kharacter']");
      console.log(posts);
      const dis = urlFor(posts[0].avatar.asset._ref);
      console.log(posts[0].name);
      setTempImger(dis.url());
      setTempNamer(posts[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <View style={[globalStyles.color, styles.summary]}>
          <View>
            <Title name={tempNamer} />
            <Image style={{ height: 300, width: 300 }} source={{ uri: tempImger }} />
          </View>
          <View>
            <Text>Framedata</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
