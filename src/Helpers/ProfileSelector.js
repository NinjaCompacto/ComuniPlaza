import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileSelector = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: null, // Proporção de corte
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: null, // Proporção de corte
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const chooseImage = () => {
    Alert.alert(
      "Selecionar Imagem",
      "Escolha uma opção",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Escolher da Galeria",
          onPress: pickImage,
        },
        {
          text: "Tirar Foto",
          onPress: takePhoto,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.imageContainer}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={chooseImage}>
          <View style={styles.imageContainer}>
            <MaterialIcons
              name="account-circle"
              size={225}
              color="#0F2355"
            />
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Editar foto</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 225,
    height: 225,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: "#0F2355",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  submitBtnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfileSelector;
