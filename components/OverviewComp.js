import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import ParseText from '../styles/ParseText';

export default function OverviewComp({ overviewString }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{overviewString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'white',
  },
});
