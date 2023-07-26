import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ClickBox({ title }) {
  const onPress = () => {
    console.log(title);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <ImageBackground style={styles.imger} source={require('../assets/img.jpg')}>
        <Text>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 200,
    padding: 5,
    flex: 1,
    overflow: 'hidden',
  },
  imger: {
    flex: 1,
    justifyContent: 'center',
  },
});
