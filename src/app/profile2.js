import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { router, useGlobalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { auth } from "../configs/firebaseConfigs";
import { signOut } from "firebase/auth";

import { getAnotherPosts } from "../utils/another_posts";
import { AnotherPosts } from "../components/AnotherFeed/AnotherPosts";

import { getUser, updateUser } from "../utils/another_perfil";
import { userID } from "./(tabs)";

// pagina de publicações do usuário
const PublicacoesPage = ({ route }) => {
  const { uid } = route.params;
  return (
    <View style={styles.container}>
      <AnotherPosts uid={userID} />
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
  // navegação para o feed
  const feedNavigate = () => {
    router.back();
  };

  const [username, setUserName] = useState("");
  const [uid, setUid] = useState("");
  const [numEventos, setNumEventos] = useState(0);
  const [numSeguidores, setNumSeguidores] = useState(0);
  const [color, setColor] = useState("#03AA00")
  const [isFollowing, setIsFollowing] = useState(false);
  const [imageUrl, setImageUrl] = useState("")

  const { item } = useGlobalSearchParams();
  const userRecuperado = JSON.parse(item);

  useEffect(() => {
    async function fetchUser() {
      setImageUrl(userRecuperado.imageUrl ? userRecuperado.imageUrl : "")
      setUserName(userRecuperado.tipoUsuario === "Pessoa" ? userRecuperado.nomeUsuario : userRecuperado.nomeCompleto);
      setUid(userRecuperado.uid);
      setNumEventos(userRecuperado.eventosApoiados ? userRecuperado.eventosApoiados.length : 0);
      setNumSeguidores(userRecuperado.seguidores ? userRecuperado.seguidores.length : 0);

      // Verifica se o usuário atual está seguindo o perfil
      const currentUser = await getUser(userID);
      const flag = currentUser.seguindo && currentUser.seguindo.includes(userRecuperado.uid)
      setIsFollowing(flag);
      setColor(flag ? "#0F2355" : "#03AA00")
    }
    fetchUser();
  }, []);

  const buttonSeguir = async () => {
    const currentUser = await getUser(userID);
    if (currentUser) {
      let updatedFollowers = userRecuperado.seguidores || [];
      let updatedFollowing = currentUser.seguindo || [];

      if (isFollowing) {
        // Se já está seguindo, remove da lista
        updatedFollowers = updatedFollowers.filter(id => id !== auth.currentUser.uid);
        updatedFollowing = updatedFollowing.filter(id => id !== userRecuperado.uid);
        setNumSeguidores(numSeguidores - 1);
        setColor("#03AA00")
      } else {
        // Se não está seguindo, adiciona à lista
        updatedFollowers.push(auth.currentUser.uid);
        updatedFollowing.push(userRecuperado.uid);
        setNumSeguidores(numSeguidores + 1);
        setColor("#0F2355")
      }

      // Atualiza o estado local
      setIsFollowing(!isFollowing);

      // Atualiza o banco de dados
      await updateUser(userRecuperado.doc_id, { seguidores: updatedFollowers });
      await updateUser(currentUser.doc_id, { seguindo: updatedFollowing });
    }
  };

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
          { imageUrl === "" ? 
          (<Ionicons name="person-circle" size={150} color="#7591D9" />) : 
          (<Image source={{ uri: imageUrl }} style={styles.imageStyle} />)}

          <Text style={styles.userName}>{username}</Text>

          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>{numSeguidores} seguidores - </Text>
            <Text style={styles.profileInfoText}>{numEventos} eventos</Text>
          </View>

          <TouchableOpacity onPress={buttonSeguir}>
            <View style={[styles.submitBtn, {backgroundColor: color}]}>
              <Text style={styles.submitBtnText}>
                {isFollowing ? 'Seguindo' : 'Seguir'}
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
        <Tab.Screen
          name="Publicações"
          component={PublicacoesPage}
          initialParams={{ userID }}
        />
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
    width: 150,
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

  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});
