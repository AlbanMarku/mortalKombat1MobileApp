import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useRef, useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function VideoPlayer({ source }) {
  const [status, setStatus] = useState({});
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
    <View style={styles.videoDiv}>
      <Pressable style={styles.pressableDiv} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.pressableText}>{isVisible ? 'Hide video' : 'Show video'}</Text>
        {isVisible ? (
          <AntDesign style={styles.arrow} name="up" size={24} color="white" />
        ) : (
          <AntDesign style={styles.arrow} name="down" size={24} color="white" />
        )}
      </Pressable>
      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        {isVisible && (
          <Video
            style={styles.videoStyle}
            source={{ uri: source }}
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
            isMuted
            shouldPlay
          />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoStyle: {
    flex: 1,
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
  arrow: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
