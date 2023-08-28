import { View, Text, Pressable, Image, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdviceBox({ adviceTitle, adviceContent, adviceThumbnail }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Lesson', { adviceContent, adviceTitle });
  };
  console.log(adviceThumbnail);
  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <ImageBackground source={{ uri: adviceThumbnail }} style={styles.imger}>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>{adviceTitle}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 100,
    marginTop: 10,
  },
  imger: {
    height: 100,
    width: '100%',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonText: {
    fontFamily: 'mk11',
    fontSize: 24,
    color: 'white',
  },
});
