import { Text, View } from 'react-native';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';

export default function StrategyComp({ info, videoUrl }) {
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <Text>I am an info lmao</Text>
      <Text>{info}</Text>
      <VideoPlayer source={'https://thumbs.gfycat.com/RemoteMeekHornedviper-mobile.mp4'} />
    </View>
  );
}
