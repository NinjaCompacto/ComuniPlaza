// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { auth } from "../configs/firebaseConfigs";
import { signOut } from "firebase/auth";

import { getAnotherPosts } from "../utils/another_posts";
import { AnotherPosts } from "../components/AnotherFeed/AnotherPosts";

import { getUser } from "../utils/another_perfil";

//pagina de publicações do usuário
const PublicacoesPage = () => {
  return (
    //recupera posts -> precisa implementar a recuperação somente dos posts do usuário
    <View style={styles.container}>
      <AnotherPosts uid={"FRYmEDnQNrd3S54NX2NqAn0hjyC3"} />

      <StatusBar style="auto" />
    </View>
  );
};

const EventosPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Eventos</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function profile2() {
  //navegação para o feed
  const feedNavigate = () => {
    router.back();
  };

  const [username, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser("FRYmEDnQNrd3S54NX2NqAn0hjyC3");
      setUserName(fetchedUser[0].nome);
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MaterialIcons
          name="chevron-left"
          size={45}
          color="#0F2355"
          style={styles.backIcon}
          onPress={feedNavigate}
        />

        <View style={styles.profileContent}>
          <Ionicons name="person-circle" size={150} color="#7591D9" />

          <Text style={styles.userName}>{username}</Text>

          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>x seguidores - </Text>
            <Text style={styles.profileInfoText}>y eventos</Text>
          </View>

          <TouchableOpacity>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Seguir</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabNavigator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: { backgroundColor: "#0F2355" },
        }}
      >
        <Tab.Screen name="Publicações" component={PublicacoesPage} />
        <Tab.Screen name="Eventos" component={EventosPage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
  },

  backIcon: {
    marginLeft: 6,
    marginTop: 25,
    position: "absolute",
    zIndex: 1,
  },

  profileContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#FFF",
  },

  userName: {
    color: "#0F2355",
    fontWeight: "bold",
    fontSize: 23,
  },

  profileInfo: {
    flexDirection: "row",
  },

  profileInfoText: {
    color: "#0F2355",
    fontWeight: "bold",
    fontSize: 13,
  },

  submitBtn: {
    backgroundColor: "#0F2355",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  tabNavigator: {
    marginTop: 15,
    elevation: 0,
    shadowOpacity: 0,
  },

  tabBarLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F2355",
  },
});
