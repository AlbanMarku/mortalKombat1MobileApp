import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function KharacterAvatar({ title, img }) {
  return (
    <TouchableOpacity style={styles.box}>
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
    height: 150,
    width: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gold',
  },
  imger: {
    flex: 1,
    resizeMode: 'cover',
  },
});
