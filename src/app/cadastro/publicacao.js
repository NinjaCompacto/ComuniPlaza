// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ImageSelector from "../../Helpers/ImageSelector";
import DropDownPickerAux from "../../Helpers/DropDownPickerAux";

export default function publicação() {
  const eventos = [
    {label: 'evento 1', value: 1},
    {label: 'evento 2', value: 2},
    {label: 'evento 3', value: 3}
  ]


  return (
    <KeyboardAvoidingView style={styles.container}>

      <View style={styles.backIcon}>
        <Ionicons
          name="chevron-back-circle"
          size={45}
          color="#1E2E57"
          // onPress={feedNavigate}
        />
      </View>

      {/* <ImageSelector onImageSelected={handleImageSelected} /> */}
      <ImageSelector/>

      <View style={styles.inputContainer}>
        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Descrição</Text>
          <TextInput
            placeholder="Adicione uma descrição a sua publicação"
            // onChangeText={onNomeChange}
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Eventos</Text>
          {/* <DropDownPickerAux onGrupoSelected={handleGrupoSelected} /> */}
          <DropDownPickerAux valuesList={eventos}/>
        </View>

        <View style={styles.line}></View>

        {/* <TouchableOpacity style={styles.submitBtn} onPress={compartilharEvento}> */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Compartilhar</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F7",
    height: '100%'
  },

  backIcon: {
    marginLeft: 10,
    marginTop: 35,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputStyle: {
    width: '80%',
    marginBottom: 2,
  },

  inputTitle: {
    fontWeight: 'bold',
  },

  line: {
    height:1,
    width: "90%",
    backgroundColor: '#7591D9',
    marginBottom: 10,
  },

  submitBtn: {
    backgroundColor: "#1E2E57",
    borderRadius: 25,
    padding: 10,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
