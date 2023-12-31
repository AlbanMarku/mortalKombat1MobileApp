import { StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Avatar({ name, img, profile, type }) {
  const page = () => {
    if (type === 'kameo') {
      return 'Kameo';
    } else if (type === 'kharacter') {
      return 'Kharacter';
    }
  };

  const navigation = useNavigation();
  const goTo = page();
  return (
    <Pressable
      onPress={() => navigation.navigate(goTo, { name, img, profile })}
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
