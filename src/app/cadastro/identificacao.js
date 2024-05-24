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

export default function App() {
  return (
    <>
      {/* header com o título da página */}
      <Appbar.Header statusBarHeight={0} style={styles.header}>
        <TouchableOpacity>
          <Link href={"../login"}>
            <MaterialIcons name="chevron-left" color="#FFF" size={35} />
          </Link>
        </TouchableOpacity>
        <Appbar.Content title="Cadastro" color="#fff" />
      </Appbar.Header>

      <View>
        <View style={styles.euSou}>
          <Text style={styles.texto}>Eu sou:</Text>
        </View>

        <View style={styles.container}>
          <Link href={"./instituicao"} asChild>
            <TouchableOpacity style={styles.btnInstituicao}>
              <Text style={styles.submitText}>Instituição </Text>
            </TouchableOpacity>
          </Link>

          <Link href={"./usuario"} asChild>
            <TouchableOpacity style={styles.btnPessoa}>
              <Text style={styles.submitText}>Pessoa</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // header da tela
  header: {
    backgroundColor: "#0F2355",
    // flexDirection: 'row',
    justifyContent: "left",
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
    flex: 0,
    //alignItems: "stretch",
    height: "60%",
    //width: "90%",
    borderLeftWidth: 22,
    borderLeftColor: "#FFF",
    justifyContent: "space-around",
    //backgroundColor: "red",
  },
  texto: {
    fontSize: 23,
  },
  //container dos botões
  container: {
    flex: 0,
    alignItems: "center",
    //alignContent: "center",
    justifyContent: "center",
    //backgroundColor: "blue",
  },
  btnInstituicao: {
    backgroundColor: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  submitText: {
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
