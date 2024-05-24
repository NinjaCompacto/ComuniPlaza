import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { Link } from "expo-router";

export default function cadastroUsuario() {
  const [hidePass, setHidePass] = useState(true);

  return (
    <>
      {/* header com o título da página */}
      <Appbar.Header statusBarHeight={0} style={styles.header}>
        <TouchableOpacity>
          <Link href={"./identificacao"}>
            <MaterialIcons name="chevron-left" color="#FFF" size={35} />
          </Link>
        </TouchableOpacity>
        <Appbar.Content title="Cadastro Instituição" color="#fff" />
      </Appbar.Header>

      {/* inputs do cadastro */}
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>Informe os seus dados</Text>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="badge"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Nome da instituição"
            placeholderTextColor="#0F2355"
            width="100%"
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="person"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="CNPJ"
            inputMode="numeric"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Repita a senha"
            secureTextEntry={true}
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="calendar-month"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Data início das atividades"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="email"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="E-mail"
            inputMode="email"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
          ></TextInput>
        </View>

        <Link href={"../login"} asChild>
          <TouchableOpacity style={styles.btnCadastro}>
            <View style={styles.btnSubmit}>
              <Text style={styles.submitText}>Cadastrar</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#0F2355",
    // flexDirection: 'row',
    justifyContent: "left",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "green",
  },

  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
  },

  inputTitle: {
    color: "#0F2355",
    fontSize: 20,
  },

  inputStyle: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#0F2355",
    borderWidth: 1,
    borderStyle: "solid",
    margin: 5,
  },

  submitText: {
    color: "#FFF",
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },

  btnCadastro: {
    backgroundColor: "#0F2355",
    width: "50%",
    height: 45,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
});
