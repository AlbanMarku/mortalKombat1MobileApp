import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function AdviceBox({
  adviceTitle,
  adviceInfo,
  adviceThumbnail,
  adviceHeader,
  adviceUrl,
}) {
  const handlePress = () => {
    console.log('clicked advice');
  };
  return (
    <Pressable style={{ height: 100, borderColor: 'red', borderWidth: 1 }} onPress={handlePress}>
      <Image source={{ uri: adviceThumbnail }} style={styles.imger} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imger: {
    height: 100,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
  },
});
