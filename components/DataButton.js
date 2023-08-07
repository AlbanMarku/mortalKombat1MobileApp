import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DataButton({ fetchRoster }) {
  const handlePress = () => {
    fetchRoster();
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Feather name="download-cloud" size={24} color="white" />
      </Pressable>
    </View>
  );
}
