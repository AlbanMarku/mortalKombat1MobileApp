import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function BottomNav() {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.item} onPress={() => console.log('clicker')}>
        <Text style={styles.text}>Frame Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => console.log('clicker')}>
        <Text style={styles.text}>item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => console.log('clicker')}>
        <Text style={styles.text}>item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopColor: '#d6d4d4',
    borderTopWidth: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: 'white',
  },
  item: {
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
