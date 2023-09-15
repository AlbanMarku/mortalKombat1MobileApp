import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

export default function About() {
  return (
    <View style={[globalStyles.color, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: 'white', textAlign: 'center', maxWidth: '80%', fontSize: 20 }}>
        Our app is not affiliated with Warner Bros., NetherRealm Studios, or any of it's partners.
        All created assets such as characters and artwork are property of NetherRealm Studio and
        Warner Bros. Entertainment Inc.
      </Text>
    </View>
  );
}
