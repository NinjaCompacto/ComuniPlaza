// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Pagina Home</Text>
      <Link href={"/login"}> IR para login do usuario</Link>
      <Link href={"/cadastroUsuario"}> Ir para cadastro do usuario</Link>
      <Link href={"/cadastroInstituicao"}> Ir para cadastro da instituicao</Link>
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
