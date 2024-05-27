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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function login() {
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
        <View style={styles.topLoginTextContainer}>
          <Text style={styles.topLoginText}>Olá,</Text>
          <Text style={styles.topLoginText}>Acesse sua conta</Text>
        </View>

        <View style={styles.input}>
          <MaterialIcons
            name="email"
            size={24}
            color="#0F2355"
            style={styles.leftIconInput}
          />

          <TextInput
            placeholder="Email"
            inputMode="email"
            autoCorrect={false}
            onChangeText={() => {}}
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          />
        </View>

        <View style={styles.passArea}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#0F2355"
            style={styles.leftIconInput}
          />

          <TextInput
            style={styles.pass}
            placeholder="Senha"
            value={input}
            onChangeText={(texto) => setInput(texto)}
            secureTextEntry={hidePass} //aplica a mascara da senha
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          />
          <TouchableOpacity
            onPress={() => setHidePass(!hidePass)} //quando clica muda o status de visualização
          >
            <Ionicons
              style={styles.icon}
              name={hidePass ? "eye" : "eye-off"}
              color="#0F2355"
              size={24}
            />
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
    padding: 10,
    //backgroundColor: "blue",
  },
  //texto da senha
  pass: {
    width: "85%",
    height: 50,
    color: "#0F2355",
    //padding: 8,
    //fontSize: 17,
  },
  //olho da senha
  icon: {
    marginLeft: -15,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#000",
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
    fontWeight: "bold",
    //color: "#0F2355"(claro) "080F20"(escuro),
  },

  topLoginTextContainer: {
    width: "90%",
    marginBottom: 8,
  },

  topLoginText: {
    fontWeight: "bold",
    color: "#0F2355",
  },

  leftIconInput: {
    marginRight: 5,
  },
});
