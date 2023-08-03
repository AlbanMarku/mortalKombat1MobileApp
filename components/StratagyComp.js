import { Text, View } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';

export default function StrategyComp({ info, videoUrl }) {
  return (
    <View style={{ backgroundColor: 'red', height: 200 }}>
      <Text>{info}</Text>
      <VideoPlayer source={videoUrl} />
    </View>
  );
}
