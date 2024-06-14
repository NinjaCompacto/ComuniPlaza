import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// elementos graficos
import ImageSelector from "../../Helpers/ImageSelector";
import DropDownPickerAux from "../../Helpers/DropDownPickerAux";

//Firebase
import { uploadImage } from "../../Helpers/ImageUploader"; // função que faz o upload da imagem para o firestore
import { auth, db } from "../../configs/firebaseConfigs";
import { collection, getDocs, addDoc } from "firebase/firestore"; // recuperação de eventos do firabase

export default function Publicacao() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descricaoPublicacao, setDescricaoPublicacao] = useState("");
  const [eventos, setEventos] = useState([]);
  const uid = auth.currentUser?.uid; // Verifica se currentUser é nulo antes de acessar uid

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const index = 0;
          const querySnapshotPromise = getDocs(collection(db, "eventos"));

          querySnapshotPromise
            .then((querySnapshot) => {
              const eventosData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              const filteredEventos = eventosData
                .filter((evento) => evento.idDono === uid)
                .map((evento) => ({
                  label: evento.nomeEvento,
                  value: evento.idEvento,
                }));
              setEventos(filteredEventos);
            })
            .catch((error) => {
              console.error("Erro ao recuperar eventos: ", error);
              Alert.alert("Erro", "Não foi possível recuperar os eventos.");
            });
        } else {
          Alert.alert("Erro", "Usuário não autenticado.");
        }
      } catch (error) {
        console.error("Erro ao recuperar eventos: ", error);
        Alert.alert("Erro", "Não foi possível recuperar os eventos.");
      }
    };

    fetchEventos();
  }, []);

  // botão de voltar para o feed
  const feedNavigate = () => {
    router.back();
  };
  // seleção de imagem
  const handleImageSelected = (uri) => {
    setSelectedImage(uri);
    console.log("URI da imagem selecionada:", uri);
  };
  // seleção de seventos
  const handleEventosSelected = (value, listaGrupos) => {
    setEventos(value);
  };
  // texto de descrição da publicação
  const onDescricaoChange = (descricaoPublicacao) => {
    setDescricaoPublicacao(descricaoPublicacao);
  };

  // validação dos campos
  const validacaoCampos = () => {
    if (selectedImage == null) {
      Alert.alert("Erro", "Escolha uma Imagem.");
      return false;
    } else {
      if (descricaoPublicacao == "") {
        Alert.alert("Erro", "Preencha a descrição da publicação.");
        return false;
      } else {
        if (eventos == null) {
          Alert.alert("Erro", "Selecione um evento.");
          return false;
        } else {
          if (eventos.length == 0) {
            Alert.alert("Erro", "Selecione um evento.");
            return false;
            a;
          } else {
            return true;
          }
        }
      }
    }
  };

  const compartilharPublicacao = async () => {
    if (validacaoCampos()) {
      console.log("Sucesso");
      try {
        const imageUrl = await uploadImage(
          selectedImage,
          `publicacoes/${Date.now()}_${uid}_publicacao.jpg`
        );
        console.log("Imagem carregada com sucesso:", imageUrl);
        // Adiciona um novo documento na coleção 'eventos' com os detalhes do evento
        const docRef = await addDoc(collection(db, "publicacoes"), {
          idPublicacao: `${uid}_${Date.now()}`,
          idDono: uid,
          descricaoPublicacao: descricaoPublicacao,
          imageUrl: imageUrl,
          eventos: eventos,
        });
        console.log("Documento adicionado com ID: ", docRef.id);
        Alert.alert("Publicação Compartilhado com Sucesso");
        router.back();
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.backIcon}>
        <Ionicons
          name="chevron-back-circle"
          size={45}
          color="#1E2E57"
          onPress={feedNavigate}
        />
      </View>

      <ImageSelector onImageSelected={handleImageSelected} />

      <View style={styles.inputContainer}>
        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Descrição</Text>
          <TextInput
            placeholder="Adicione uma descrição a sua publicação"
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={onDescricaoChange}
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Eventos</Text>
          <DropDownPickerAux
            valuesList={eventos}
            onGrupoSelected={handleEventosSelected}
          />
        </View>

        <View style={styles.line}></View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={compartilharPublicacao}
        >
          <Text style={styles.submitBtnText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F7",
    height: "100%",
  },

  backIcon: {
    marginLeft: 10,
    marginTop: 32,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputStyle: {
    width: "80%",
    marginBottom: 2,
  },

  inputTitle: {
    fontWeight: "bold",
  },

  line: {
    height: 1,
    width: "90%",
    backgroundColor: "#7591D9",
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
