import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import Title from '../components/Title';
const Lesson = ({ route, navigation }) => {
  const { adviceContent, adviceTitle } = route.params;

  const AdviceSection = ({ name, text }) => {
    console.log(text);
    return (
      <View>
        <Title name={name} subHeader />
        <View>
          <Text style={styles.adviceText}>{text}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[globalStyles.color, { flex: 1 }]}>
      <Title name={adviceTitle} />
      {adviceContent.map((item, index) => {
        return (
          <AdviceSection key={index.toString()} name={item.adviceHeader} text={item.adviceText} />
        );
      })}
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  adviceText: {
    color: 'white',
  },
});
