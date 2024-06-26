// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";

import { auth } from "../../configs/firebaseConfigs";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { Posts } from "../../components/Feed/Posts";
import { POSTS, getPosts } from "../../utils/posts";

var userID;
var userData;

export default function index() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData = user;
        const uid = user.uid;
        userID = uid;
        // console.log(uid);
      } else {
        //caso o usuario não esteja logado, ele direciona para tela de login.
        router.navigate("./../login");
      }
    });
  });

  return (
    <View style={styles.container}>
      <Posts />

      <StatusBar style="auto" />
    </View>
  );
}

export { userID, userData };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
});
