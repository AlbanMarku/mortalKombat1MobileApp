import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//call func multiple times to make components with params.

export default function LessonButtons() {
  const onPress = (title) => {
    console.log(title);
  };

  const sources = {
    source1: require('../assets/imgs/beg.jpg'),
    source2: require('../assets/imgs/int.jpg'),
    source3: require('../assets/imgs/adv.jpg'),
  };

  const imageComp = (title, img) => {
    return (
      <TouchableOpacity onPress={() => onPress(title)} style={styles.box}>
        <ImageBackground style={styles.imger} source={img}>
          <View style={styles.textContainer}>
            <Text style={{ fontFamily: 'mk11', fontSize: 25, color: 'white' }}>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {imageComp('Beginner', sources.source1)}
        {imageComp('Intermediate', sources.source2)}
      </View>
      <View>{imageComp('Advanced', sources.source3)}</View>
    </View>
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
