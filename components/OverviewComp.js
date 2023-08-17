import { Text, View, StyleSheet } from 'react-native';

export default function OverviewComp({ overviewObj }) {
  console.log(overviewObj);

  const RenderStrengths = () => {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        {overviewObj.strengths.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })}
      </View>
    );
  };

  const RenderWeaknesses = () => {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        {overviewObj.weaknesses.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RenderStrengths />
      <RenderWeaknesses />
      <Text style={styles.text}>{overviewObj.intro}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'white',
  },
});
