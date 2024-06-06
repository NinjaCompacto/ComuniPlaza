// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";

import { auth } from "./../configs/firebaseConfigs";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function index() {

  // usado para deslogar usuario
  //signOut(auth).then(() => {
    //console.log("Deslogado com sucesso");
  //});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        //caso o usuario não esteja logado, ele direciona para tela de login.
        router.navigate("./../login"); 
      }
    });
  });

  

  return (
    <View style={styles.container}>
      <Text>Pagina Home</Text>
      <Link href={"/login"}> IR para login do usuario</Link>
      <Link href={"/cadastro/evento"}> IR para cadastro evento</Link>
      <Link href={"/cadastro/publicacao"}> IR para cadastro publicacao</Link>
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
