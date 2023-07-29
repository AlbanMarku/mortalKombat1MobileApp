import { StyleSheet, Modal, Text, View } from 'react-native';
import InputOption from './InputOption';

export default function HeaderComp() {
  return (
    <View style={styles.header}>
      <InputOption />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'white',
    paddingRight: 15,
  },
});
