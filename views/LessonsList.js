import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import AdviceBox from '../components/AdviceBox';
import Title from '../components/Title';
import { useState, useEffect } from 'react';

export default function LessonsList({ route, navigation }) {
  const { title, lessons } = route.params;

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <Title name={title} underline />
      {lessons.map((item, index) => (
        <AdviceBox
          key={index}
          adviceTitle={item.adviceTitle}
          adviceContent={item.adviceContent}
          adviceThumbnail={item.adviceThumbnail}
        />
      ))}
    </View>
  );
}
