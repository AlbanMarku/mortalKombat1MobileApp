import { View, Text, Image, StyleSheet } from 'react-native';
import BottomNav from '../routes/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';

export default function Kharacter({ route, navigation }) {
  const { name, img, basicAttacks } = route.params;

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <ScrollView>
        <View style={[globalStyles.color, styles.summary]}>
          <View>
            <Title name={name} />
            <Image style={{ height: 300, width: 300 }} source={{ uri: img }} />
          </View>
          <View>
            {basicAttacks.map((item) => {
              const dir = item.attackInput.direction;
              const but = item.attackInput.button;
              if (dir == 5) {
                return <Text>{but}</Text>;
              } else {
                return (
                  <Text>
                    {dir}
                    {but}
                  </Text>
                );
              }
            })}
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
