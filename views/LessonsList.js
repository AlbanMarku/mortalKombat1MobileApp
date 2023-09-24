import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import LessonThumbnail from '../components/LessonThumbnail';
import Title from '../components/Title';

export default function LessonsList({ route, navigation }) {
  const { title, lessons } = route.params;

  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <Title name={title} underline />
      {lessons.map((item, index) => (
        <LessonThumbnail
          key={index}
          adviceTitle={item.adviceTitle}
          adviceContent={item.adviceContent}
          adviceThumbnail={item.adviceThumbnail}
        />
      ))}
    </View>
  );
}
