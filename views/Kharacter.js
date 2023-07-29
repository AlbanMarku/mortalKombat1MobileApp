import { View, Text, Image, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';
import { InputContext } from '../Context';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';
import axios from 'axios';
import { createClient } from '@sanity/client';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import imageUrlBuilder from '@sanity/image-url';

export default function Kharacter({ route, navigation }) {
  setupURLPolyfill();

  const client = createClient({
    projectId: 'd3ix1agf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-07-29',
  });

  const builder = imageUrlBuilder(client);

  const urlFor = (source) => {
    return builder.image(source);
  };

  const { name, img } = route.params;

  const { input } = useContext(InputContext);

  const getDetails = async () => {
    try {
      const posts = await client.fetch("*[_type == 'kharacter']");
      const dis = urlFor(posts[0].avatar.asset._ref);
      console.log(dis.url());
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
            <Title name={name} />
            <Image style={{ height: 300, width: 300 }} source={{ uri: img }} />
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
