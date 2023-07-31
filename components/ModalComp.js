import { View, Text, TouchableOpacity } from 'react-native';

export default function ModalComp({ setOpenModal }) {
  const handlePress = () => {
    setOpenModal(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Close me</Text>
      </TouchableOpacity>
    </View>
  );
}
