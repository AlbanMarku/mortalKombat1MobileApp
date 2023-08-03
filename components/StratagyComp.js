import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState, useRef } from 'react';
import Title from './Title';

export default function StrategyComp({ info, videoUrl, title }) {
  const [isVisible, setIsVisible] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current; //learn how the animation library works.

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isVisible ? 200 : 0,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, [isVisible]);
  console.log(info);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.stratTitle}>{title}</Text>
        <Text style={styles.infoText}>{info}</Text>
      </View>
      <View style={styles.videoDiv}>
        <Pressable style={styles.pressableDiv} onPress={() => setIsVisible(!isVisible)}>
          <Text style={styles.pressableText}>{isVisible ? 'Hide video' : 'Show video'}</Text>
        </Pressable>
        <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
          {isVisible && <VideoPlayer source={videoUrl} />}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
  },
  videoDiv: {
    // alignItems: 'center',
  },
  pressableDiv: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#292929',
    marginVertical: 20,
  },
  pressableText: {
    fontSize: 20,
    color: 'white',
  },
  stratTitle: {
    color: 'white',
    fontFamily: 'mk11',
    fontSize: 24,
    paddingBottom: 10,
  },
});
