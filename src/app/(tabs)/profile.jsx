// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { auth } from "../../configs/firebaseConfigs";
import { signOut } from "firebase/auth";

import { SelfPosts } from "../../components/SelfFeed/SelfPosts";
import { SelfEvents } from "../../components/SelfFeed/SelfEvents";

import { getUser } from "../../utils/self_perfil";

//pagina de publicações do usuário
const PublicacoesPage = () => {
  return (
    //recupera posts -> precisa implementar a recuperação somente dos posts do usuário
    <View style={styles.container}>
      <SelfPosts />
      <StatusBar style="auto" />
    </View>
  );
};

const EventosPage = () => {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View style={styles.container}>
      <SelfEvents />
      <StatusBar style="auto" />
    </View>
  );
};

// Função de logOut
const LogOut = () => {
  signOut(auth).then(() => {
    console.log("Deslogado com sucesso");
  });
};

const EditProfile = () => {
  router.navigate("./../EditProfile/EditProfile");
};

const Tab = createMaterialTopTabNavigator();

export default function profile() {
  //navegação para o feed
  const feedNavigate = () => {
    router.back();
  };

  const [username, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [numSeguidores, setNumSeguidores] = useState(0);
  const [numEventosApoiados, setNumEventosApoiados] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUserName(fetchedUser[0].nome);
      setImageUrl(fetchedUser[0].imageUrl);
      setNumSeguidores(fetchedUser[0].seguidores.length);
      setNumEventosApoiados(fetchedUser[0].eventosApoiados.length);
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MaterialIcons
          name="logout"
          size={32}
          color="#0F2355"
          style={styles.backIcon}
          onPress={LogOut}
        />
        <View style={styles.profileContent}>
          {imageUrl != "" ? (
            <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
          ) : (
            <Ionicons name="person-circle" size={150} color="#7591D9" />
          )}

          <Text style={styles.userName}>{username}</Text>

          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}> {numSeguidores} seguidores - </Text>
            <Text style={styles.profileInfoText}> {numEventosApoiados} eventos</Text>
          </View>

          <TouchableOpacity>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText} onPress={EditProfile}>
                Editar Perfil
              </Text>
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
    marginRight: 12,
    marginTop: 33,
    position: "absolute",
    zIndex: 1,
    right: 0,
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
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F2355",
    textTransform: "none",
  },

  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 10
  },
});
