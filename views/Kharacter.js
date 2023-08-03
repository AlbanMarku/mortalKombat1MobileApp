import { View, Image, StyleSheet, ScrollView } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
import { useState, useEffect } from 'react';
import KharacterGuide from '../components/KharacterGuide';
import { client } from '../components/SanityClient';

//Fetch attack info from name query. Props drilled to FrameData screen.

export default function Kharacter({ route, navigation }) {
  const { name, profile } = route.params;

  const [basicAttacks, setBasicAttacks] = useState([]);
  const [stringAttacks, setStringAttacks] = useState([]);
  const [specialAttacks, setSpecialAttacks] = useState([]);

  const fetchAttackData = async () => {
    try {
      const queryData = await client.fetch(
        `*[_type == 'kharacter' && name== "${name}"]{ _id,name, basicAttacks[]{..., attackType->{name}},stringAttacks[]{..., attackType->{name}},basicAttacks[]{..., attackType->{name}},specialAttacks[]{...,attackType->{name}}}`
      );

      queryData.map((item) => {
        setBasicAttacks(item.basicAttacks);
        setStringAttacks(item.stringAttacks);
        setSpecialAttacks(item.specialAttacks);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttackData();
  }, []);
  console.log(stringAttacks);
  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <Title name={name} />
        <View style={styles.imageDiv}>
          <Image style={{ height: 300, width: 300 }} source={{ uri: profile }} />
        </View>
        <KharacterGuide name={name} />
      </ScrollView>
      <BottomNav
        basicAttacks={basicAttacks}
        stringAttacks={stringAttacks}
        specialAttacks={specialAttacks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageDiv: {
    alignItems: 'center',
  },
});
