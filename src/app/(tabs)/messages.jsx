import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";

import { Link } from "expo-router";

export default function messages() {
 
  return (
    <SafeAreaView style={styles.container}>
      <Text>Mensagens</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center'
  },
})