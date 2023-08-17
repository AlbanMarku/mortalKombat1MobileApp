import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

export default function OverviewComp({ overviewObj }) {
  console.log(overviewObj.strengths);

  const RenderStrengths = () => {
    return (
      <View>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <Text style={{ color: 'white', fontFamily: 'mk11', fontSize: 22 }}>Strengths</Text>
        </View>
        <View>
          {overviewObj.strengths.map((item, index) => {
            return (
              <View key={index}>
                <Text
                  style={[styles.arrayText, styles.pro, index % 2 === 0 ? styles.even : styles.odd]}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const RenderWeaknesses = () => {
    return (
      <View>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <Text style={{ color: 'white', fontFamily: 'mk11', fontSize: 22 }}>weaknesses</Text>
        </View>
        <View>
          {overviewObj.weaknesses.map((item, index) => {
            return (
              <View key={index}>
                <Text
                  style={[styles.arrayText, styles.neg, index % 2 === 0 ? styles.even : styles.odd]}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.introText}>{overviewObj.intro}</Text>
      <View style={styles.container}>
        <RenderStrengths />
        <RenderWeaknesses />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 15,
    marginHorizontal: 1,
  },
  introText: {
    color: 'white',
  },
  arrayText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
  },
  pro: {
    color: 'green',
  },
  neg: {
    color: 'red',
  },
  even: {
    backgroundColor: '#333232',
  },
  odd: {
    backgroundColor: '#4a4949',
  },
});
