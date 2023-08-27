import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import ParseText from '../styles/ParseText';

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.stratTitle}>{title}</Text>
        <ParseText para={info} />
      </View>
      {videoUrl && <VideoPlayer source={videoUrl} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  videoDiv: {
    // alignItems: 'center',
  },
  pressableDiv: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#292929',
    marginTop: 20,
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
  arrow: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
