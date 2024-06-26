// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { auth } from "../../configs/firebaseConfigs";
import { signOut } from "firebase/auth";

export default function messages() {
  // usado para deslogar usuario
  //signOut(auth).then(() => {
  //console.log("Deslogado com sucesso");
  //});

  return (
    <View style={styles.container}>
      <Link href={"../profile2"}> EXIBIR PERFIL DE LINA</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
