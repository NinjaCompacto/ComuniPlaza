import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

// firebase imports
import { auth } from "../configs/firebaseConfigs";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [hidePass, setHidePass] = useState(true);

  // validação de email
  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validacaoCampos = async (email, senha) => {
    if (email == "" || senha == "") {
      Alert.alert("Erro", "Preencha os campos.");
      return false;
    } else {
      if (!isEmailValid(email)) {
        Alert.alert("Erro", "Digite um email Valido.");
        return false;
      } else {
        return true;
      }
    }
  };

  const handleLogin = async () => {
    validacaoinfos = await validacaoCampos(email, senha);

    if (validacaoinfos) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          senha
        );
        const user = userCredential.user;
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        router.back();
      } catch (error) {
        const errorCode = error.code;
        // Tratamento de erros pelo Firebase
        if (errorCode === "auth/invalid-credential") {
          Alert.alert("Erro", "Email ou Senha invalidos.");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("Erro", "Usuário não encontrado.");
        } else {
          Alert.alert("Erro", "Erro ao fazer login.");
        }
      }
    }
  };

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

        <View style={styles.senha}>
          <MaterialIcons
            name="email"
            size={24}
            color="#0F2355"
            style={styles.leftIconInput}
          />

          <TextInput
            placeholder="Email"
            inputMode="email"
            width="100%"
            autoCorrect={false}
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setEmail(texto)}
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
            value={senha}
            secureTextEntry={hidePass} //aplica a mascara da senha
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setSenha(texto)}
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

        <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin}>
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
  },
  //texto da senha
  pass: {
    width: "85%",
    height: 50,
    color: "#0F2355",
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    width: "90%",
    height: 50,
  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: "stretch",
  },
  senha: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#0F2355",
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 15,
    backgroundColor: "#FFF",
    padding: 10,
    fontSize: 17,
    color: "#000",
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
