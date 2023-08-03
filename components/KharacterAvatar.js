import { StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function KharacterAvatar({ name, img, profile }) {
  const navigation = useNavigation();
  //Touchable box component. On press, navigate to stack screen "kharacter" and pass name and profile img props.
  return (
    <Pressable
      onPress={() => navigation.navigate('Kharacter', { name, img, profile })}
      style={({ pressed }) => (pressed ? styles.dim : styles.box)}
    >
      <Image
        source={{
          uri: img,
        }}
        style={styles.imger}
      />
    </Pressable>
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
  dim: {
    height: 120,
    width: 70,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
    opacity: 0.5,
  },
});
