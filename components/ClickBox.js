import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ClickBox({ title, img }) {
  const onPress = () => {
    console.log(title);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <ImageBackground style={styles.imger} source={{ uri: img }}>
        <Text>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 200,
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
  },
  imger: {
    flex: 1,
    justifyContent: 'center',
  },
});
