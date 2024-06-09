// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";

import { auth } from "../../configs/firebaseConfigs";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { Posts } from "../../components/Posts";
import { POSTS } from "../../utils/posts";

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
      <Posts posts={POSTS} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    paddingTop: 20,
  },
});
