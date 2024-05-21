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
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function App() {
  const [input, setInput] = useState("");
  const [hidePass, setHidePass] = useState(true);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("./../../assets/logo_a.png")}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <View style={styles.passArea}>
          <TextInput
            style={styles.pass}
            placeholder="Senha"
            value={input}
            onChangeText={(texto) => setInput(texto)}
            secureTextEntry={hidePass} //aplica a mascara da senha
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePass(!hidePass)} //quando clica muda o status de visualização
          >
            <Ionicons name="eye" color="#0F2355" size={25} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Link href={"/cadastro/identificacao"}>
            <Text style={styles.registerText}>Criar Conta</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  //area da senha
  passArea: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#0F2355",
    borderWidth: 1,
    borderStyle: "solid",
    //backgroundColor: "blue",
  },
  //texto da senha
  pass: {
    width: "85%",
    height: 50,
    color: "#0F2355",
    padding: 8,
    fontSize: 17,
  },
  //olho da senha
  icon: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    width: "90%",
    height: 50,
    //backgroundColor: "blue",
  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: "stretch",
  },
  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderColor: "#0F2355",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    backgroundColor: "#0F2355",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: "#0F2355",
    //color: "#0F2355"(claro) "080F20"(escuro),
  },
});