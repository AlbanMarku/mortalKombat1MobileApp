import { View, StyleSheet, Modal, Text } from 'react-native';
import MoveBox from './MoveBox';
import Title from './Title';
import { useContext, useState } from 'react';
import { MyContext } from '../Context';
import ModalComp from './ModalComp';

export default function BasicAttacks({ basicAttacks }) {
  const [input, setInput, rosterData, setRosterData, getIcon] = useContext(MyContext);
  const iconSet = getIcon(input);
  const [openModal, setOpenModal] = useState(false);

  return (
    <View>
      <Title name={'Frame Data'} />
      <Modal transparent={true} animationType="slide" visible={openModal}>
        <View style={styles.modal}>
          <ModalComp setOpenModal={setOpenModal} />
        </View>
      </Modal>
      <View style={styles.moveList}>
        {basicAttacks.map((item, index) => {
          return (
            <MoveBox
              attack={item}
              iconSet={iconSet}
              setOpenModal={setOpenModal}
              style={index % 2 === 0 ? styles.evenItem : styles.oddItem}
              key={index.toString()}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moveList: {
    marginBottom: 50,
  },
  evenItem: {
    backgroundColor: '#333232',
  },
  oddItem: {
    backgroundColor: '#4a4949',
  },
  modal: {
    marginTop: 'auto',
    minHeight: 300,
    height: '50%',
  },
});
