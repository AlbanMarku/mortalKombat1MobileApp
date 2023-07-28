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

export default function Kharacter({ route, navigation }) {
  const { name, img } = route.params;

  const { input } = useContext(InputContext);

  const getDetails = async () => {
    try {
      const TEMPID = 'd3ix1agf';
      const TEMPDATASET = 'production';
      const QUERY = encodeURIComponent('*[_type == "kharacter"]');

      const response = await axios.get(
        `https://${TEMPID}.api.sanity.io/v2021-10-21/data/query/${TEMPDATASET}?query=${QUERY}`
      );

      console.log(response.data.result[0].name);
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
