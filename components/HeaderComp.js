import { StyleSheet, Text, View } from 'react-native';

export default function HeaderComp() {
  return (
    <View style={styles.header}>
      <Text>My awesome app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: 'coral',
  },
});
