import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function identificacao() {
  return (
    <>
      {/* header com o título da página */}
      <Appbar.Header statusBarHeight={0} style={styles.header}>
        <TouchableOpacity>
          <Link href={"../login"}>
            <MaterialIcons name="chevron-left" color="#FFF" size={35} />
          </Link>
        </TouchableOpacity>

        <Appbar.Content title="Cadastro" color="#FFF"/>

      </Appbar.Header>

        <View style={styles.euSou}>
          <Text style={styles.texto}>Eu sou:</Text>
        </View>

        <View style={styles.container}>
          <Link href={"./instituicao"} asChild>
            <TouchableOpacity style={styles.btnInstituicao}>
              <Text style={styles.instSubmitText}>Instituição </Text>
            </TouchableOpacity>
          </Link>

          <Link href={"./usuario"} asChild>
            <TouchableOpacity style={styles.btnPessoa}>
              <Text style={styles.userSubmitText}>Pessoa</Text>
            </TouchableOpacity>
          </Link>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    // header da tela
  header: {
    backgroundColor: "#0F2355",
    // flexDirection: 'row',
    //justifyContent: "left",
  },

  //seta de retorno a tela de login
  seta: {
    width: "40%",
    height: 50,
    //alignContent: "left",
    //alignItems: "left",
    //justifyContent: "center",
    borderLeftWidth: 12,
    borderLeftColor: "#FFF",
    borderTopWidth: 12,
    borderTopColor: "#FFF",
    //marginLeft: 10,
    //backgroundColor: "green",
  },

  //Título da página
  titulo: {
    //width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 10,
    borderTopColor: "#FFF",
    //justifyContent: "left",
    //alignContent: "center",
    //backgroundColor: "yellow",
  },

  //texto presente na página
  euSou: {
    marginTop: 150,
    marginBottom: 15,
    flex: 0,
    borderLeftWidth: 22,
    borderLeftColor: "#FFF",
  },
  texto: {
    fontSize: 23,
    color: "#0F2355",
    fontWeight: 'bold'
  },
  //container dos botões
  container: {
    flex: 0,
    // justifyContent: "center",
    alignItems: "center"
  },
  btnInstituicao: {
    //backgroundColor: "#0F2355",
    backgroundColor: "#FFF",
    borderColor: "#0F2355",
    color: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 15,
  },
  instSubmitText: {
    color: "#0F2355",
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },

  userSubmitText: {
    color: "#FFF",
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },

  btnPessoa: {
    backgroundColor: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  registerText: {
    color: "#0F2355",
    //color: "#0F2355"(claro) "080F20"(escuro),
  },
});
