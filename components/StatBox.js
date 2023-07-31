import { View, Text, StyleSheet } from 'react-native';

export default function StatBox({ name, stat }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.stat}>{stat}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  name: {
    color: 'white',
    marginBottom: 5,
  },
  stat: {
    color: 'orange',
  },
});
