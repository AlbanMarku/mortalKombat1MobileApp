import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import AdviceBox from '../components/AdviceBox';
import Title from '../components/Title';
import { urlFor } from '../components/SanityClient';
import { useState, useEffect } from 'react';

export default function LessonOptions({ route, navigation }) {
  const { title, lessons } = route.params;
  const parsedLessons = JSON.parse(lessons);
  const [exctractedLessons, setExtractedLessons] = useState([]);

  const handleArray = () => {
    const lessonArray = parsedLessons.map((item) => {
      const parsedThumbnail = urlFor(item.adviceThumbnail.asset._ref).url();
      const parsedUrl = item?.adviceUrl || null;
      const parsedHeader = item?.adviceHeader || null;
      return {
        ...item,
        adviceThumbnail: parsedThumbnail,
        adviceUrl: parsedUrl,
        adviceHeader: parsedHeader,
      };
    });
    setExtractedLessons(lessonArray);
  };

  useEffect(() => {
    handleArray();
  }, []);

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <Title name={title} underline />
      {exctractedLessons.map((item, index) => (
        <AdviceBox
          key={index}
          adviceTitle={item.adviceTitle}
          adviceInfo={item.adviceInfo}
          adviceThumbnail={item.adviceThumbnail}
          adviceHeader={item.adviceHeader}
          adviceUrl={item.adviceUrl}
        />
      ))}
    </View>
  );
}
