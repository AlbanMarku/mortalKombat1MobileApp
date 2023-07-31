import { View, Image, StyleSheet } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import FrameData from '../components/FrameData';
import { useState } from 'react';
import KharacterGuide from '../components/KharacterGuide';
//use props to populate data. neutral input only render button.

export default function Kharacter({ route, navigation }) {
  const { name, img, profile, basicAttacks } = route.params;
  const [page, setPage] = useState(0);

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <Title name={name} />
        <View style={styles.imageDiv}>
          <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
        </View>
        <KharacterGuide />
      </ScrollView>
      <BottomNav setPage={setPage} basicAttacks={basicAttacks} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
});
