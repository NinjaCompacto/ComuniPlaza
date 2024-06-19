import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

export default function identificacao() {
  const feedNavigate = () => {
    router.back();
  };

  return (
    <>
      {/* header com o título da página */}
      <View style={styles.header}>
        <MaterialIcons
          name="chevron-left"
          size={45}
          color="#0F2355"
          style={styles.backIcon}
          onPress={feedNavigate}
        />
        <Text style={styles.headerText}>Cadastro</Text>
      </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  // header da tela
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0F2355",
  },

  backIcon: {
    left: 6,
    position: "absolute",
  },

  //Título da página
  titulo: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 10,
    borderTopColor: "#FFF",
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
    fontWeight: "bold",
  },
  //container dos botões
  container: {
    flex: 0,
    alignItems: "center",
  },
  btnInstituicao: {
    //backgroundColor: "#0F2355",
    backgroundColor: "#7591D9",
    color: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 15,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  btnPessoa: {
    backgroundColor: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 15,
  },
  registerText: {
    color: "#0F2355",
  },
});
