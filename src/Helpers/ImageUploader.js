import { storage } from './../configs/firebaseConfigs'; // Atualize com o caminho correto
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert } from 'react-native';

// Função para converter uma URI para um blob
const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const uploadImage = async (uri, path) => {
  try {
    const blob = await uriToBlob(uri);
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    Alert.alert("Erro", "Não foi possível fazer o upload da imagem.");
    throw error;
  }
};
