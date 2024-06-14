// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { auth } from "../../configs/firebaseConfigs";
import { signOut } from "firebase/auth";

const Teste1 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>publicações</Text>
    </View>
  )
}

const Teste2 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Eventos</Text>
    </View>
  )
}

const Tab = createMaterialTopTabNavigator();

export default function profile() {
  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Ionicons
            name="chevron-back-circle"
            size={45}
            color="#1E2E57"
            style={styles.backIcon}
            // onPress={feedNavigate}
          />

          <View style={styles.profileContent}>
            <Ionicons 
              name="person-circle" 
              size={150} 
              color="#7591D9"
            />

            <Text style={styles.userName}>Nome do Usuário</Text>

            <View style={styles.profileInfo}>
              <Text style={styles.profileInfoText}>x seguidores - </Text>
              <Text style={styles.profileInfoText}>y eventos</Text>
            </View>

            <TouchableOpacity>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Editar Perfil</Text>
              </View>
            </TouchableOpacity>       
          </View>      
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabNavigator,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: {backgroundColor: '#1E2E57'}
        }}
      >
        <Tab.Screen name='Publicações' component={Teste1}/>
        <Tab.Screen name='Eventos' component={Teste2}/>
      </Tab.Navigator>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF'
  },

  backIcon: {
    marginLeft: 10,
    marginTop: 32,
    position: 'absolute',
    zIndex: 1,
  },

  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#FFF'
  },

  userName: {
    color: '#1E2E57',
    fontWeight: 'bold',
    fontSize: 23
  },

  profileInfo: {
    flexDirection: 'row',
  },

  profileInfoText: {
    color: '#1E2E57',
    fontWeight: 'bold',
    fontSize: 13
  },

  submitBtn: {
    backgroundColor: "#1E2E57",
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
    shadowOpacity: 0
  },

  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E2E57'
  },
});
