import { StyleSheet, View } from 'react-native';
import InputOption from './InputOption';
import DataButton from './DataButton';

export default function HeaderComp({ option, fetchRoster }) {
  return (
    <View style={styles.header}>
      {option === 'download' ? <DataButton fetchRoster={fetchRoster} /> : <InputOption />}
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
