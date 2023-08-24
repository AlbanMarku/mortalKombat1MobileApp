import { View, Text } from 'react-native';
import React from 'react';

export default function LessonOptions({ route, navigation }) {
  const { title, lessons } = route.params;
  console.log(lessons);
  return <View></View>;
}
