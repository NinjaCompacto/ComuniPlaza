import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import ImageSelector from './../../Helpers/ImageSelector'; // seletor de imagens
import DropDownPickerAux from "./../../Helpers/DropDownPickerAux"; // lista suspensa
import EventoTextInputs, { validarInputs } from './../../Helpers/EventosTextInput'; // importando o componente de text inputs e a função de validação

export default function publicacao() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGrupos, setSelectedGrupos] = useState([]);
  const [nomeEvento, setNomeEvento] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [inicioEvento, setInicioEvento] = useState('');
  const [finalEvento, setFinalEvento] = useState('');

  // recupera a imagem selecionada.
  const handleImageSelected = (uri) => {
    setSelectedImage(uri);
    console.log("URI da imagem selecionada:", uri);
  }

  // recupera a lista com os grupos selecionados (indexs).
  const handleGrupoSelected = (value) => {
    setSelectedGrupos(value);
    console.log("Grupos selecionados:", value);
  }

  // faz a validação da imagem selecionada dos grupos selecionados
  const validacaoOfAll = () => {
    if (!validarInputs(nomeEvento, descricaoEvento, inicioEvento, finalEvento)) {
      return false;
    }
    else{
      //validação da escolha dos grupos
      if (selectedGrupos != null){
        if (selectedGrupos.length == 0){
          Alert.alert("Erro", "Selecione os grupos"); 
          return false;
        }
        else{
          if(selectedImage == null){
            Alert.alert("Erro", "Selecione uma imagem"); 
            return false;
          }
          else{
            return true;
          }
        }
      }else{
        Alert.alert("Erro", "Selecione os grupos"); 
        return false;
      }
    }
  };

  const compartilharEvento = () => {
    //validação de inputs
    if(validacaoOfAll()){
      console.log("Sucesso");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Icone de retorno no topo da tela */}
      <View>
        <Link href={"./../feed"}>
          <Ionicons style={styles.backIcon} name="chevron-back-circle" size={45} color="#1E2E57"/>
        </Link>
      </View>

      {/* Componente ImageSelector, para alterações: /helpers/ImageSelector */}
      <ImageSelector onImageSelected={handleImageSelected}/>

      {/* inputs de dados do evento */}
      <View style={styles.inputContainer}>
        <EventoTextInputs
          onNomeChange={setNomeEvento}
          onDescricaoChange={setDescricaoEvento}
          onInicioChange={setInicioEvento}
          onFinalChange={setFinalEvento}
        />

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Grupos beneficiados</Text>
          <DropDownPickerAux onGrupoSelected={handleGrupoSelected}/>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={compartilharEvento}>
          <Text style={styles.submitBtnText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F7",
    height: "100%",
  },

  backIcon: {
    marginLeft: 10,
    marginTop: 8
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputStyle: {
    width: '80%',
  },

  inputTitle: {
    fontWeight: 'bold'
  },

  line: {
    height: 1,
    width: "90%",
    backgroundColor: '#7591D9'
  },

  submitBtn: {
    backgroundColor: "#1E2E57",
    borderRadius: 25,
    padding: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold'
  },

  selectInputStyle: {
    backgroundColor: "#1E2E57",
    borderRadius: 20,
    color: "#FFF",
    marginTop: 5,
    minHeight: 25,
  },
});
