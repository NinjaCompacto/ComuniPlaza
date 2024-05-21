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

export default function App() {
  const [input, setInput] = useState("");
  const [hidePass, setHidePass] = useState(true);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnInstituicao}>
          <Text style={styles.submitText}>Instituição</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPessoa}>
          <Text style={styles.submitText}>Pessoa</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btnInstituicao: {
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
