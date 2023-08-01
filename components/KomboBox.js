import { View, StyleSheet, Text } from 'react-native';

export default function KomboBox({ attack, iconSet, style }) {
  const kombo = attack.attackInputs;

  return (
    <View style={{ backgroundColor: 'red' }}>
      {kombo.map((item) => {
        return (
          <View style={{ flexDirection: 'row' }} key={item.key}>
            <Text>{item.direction}</Text>
            <Text>{item.button}</Text>
          </View>
        );
      })}
    </View>
  );
}
