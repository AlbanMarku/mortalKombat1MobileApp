import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ClickBox({ title, img }) {
  const onPress = () => {
    console.log(title);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <ImageBackground style={styles.imger} source={{ uri: img }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
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
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
