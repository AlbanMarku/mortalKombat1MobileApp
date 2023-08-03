import { Text, View, Pressable, Animated } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState, useRef } from 'react';

export default function StrategyComp({ info, videoUrl }) {
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
    <View style={{ backgroundColor: 'red', borderColor: 'blue', borderWidth: 1 }}>
      <Text>{info}</Text>
      <Pressable onPress={() => setIsVisible(!isVisible)}>
        <Text>{isVisible ? 'Hide video' : 'Show video'}</Text>
      </Pressable>
      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        {isVisible && <VideoPlayer source={videoUrl} />}
      </Animated.View>
    </View>
  );
}
