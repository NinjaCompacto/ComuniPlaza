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
      <Link href='../evento'>Tela de evento</Link>
      <Link href='../publicacao'>Tela de publicação</Link>
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