import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function KharacterAvatar({ name, img }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Kharacter', { name, img })}
      style={styles.box}
    >
      <Image
        source={{
          uri: img,
        }}
        style={styles.imger}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 70,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
  },
  imger: {
    flex: 1,
    resizeMode: 'cover',
  },
});
