import { StyleSheet, View, Modal, Text, Image } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Title from './Title';

export default function LegendComp() {
  const [openModal, setOpenModal] = useState(false);

  const handlePress = () => {
    setOpenModal(true);
    console.log('click');
  };

  return (
    <View style={styles.header}>
      <Modal
        onRequestClose={() => setOpenModal(false)}
        transparent={true}
        animationType="fade"
        visible={openModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Title name={'Legend'} />
          </View>
          <View style={styles.modalContent}>
            <View style={styles.modalDiv}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../assets/imgs/ASSIST.png')}
              />

              <Text style={styles.modalText}>Assist</Text>
            </View>
            <View style={styles.modalDiv}>
              <Image style={{ width: 40, height: 40 }} source={require('../assets/imgs/AMP.png')} />

              <Text style={styles.modalText}>Enhanced</Text>
            </View>
            <View style={styles.modalDiv}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../assets/imgs/THROW.png')}
              />

              <Text style={styles.modalText}>Throw</Text>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={handlePress}>
        <Text>Click me</Text>
      </TouchableOpacity>
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
  modal: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333232',
    position: 'absolute',
    top: 70,
    flex: 1,
    paddingBottom: 15,
    width: '100%',
  },
  modalHeader: {},
  modalContent: {
    width: '100%',
  },
  modalDiv: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'mk11',
    fontSize: 20,
    color: 'white',
  },
});
