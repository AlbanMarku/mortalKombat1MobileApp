import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useRef, useState } from 'react';

export default function VideoPlayer({ source }) {
  const [status, setStatus] = useState({});
  return (
    <Video
      style={styles.videoStyle}
      source={{ uri: source }}
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={setStatus}
      isMuted
      shouldPlay
    />
  );
}

const styles = StyleSheet.create({
  videoStyle: {
    backgroundColor: 'red',
    height: 200,
  },
});
