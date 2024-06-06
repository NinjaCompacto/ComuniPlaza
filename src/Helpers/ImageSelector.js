import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ImageSelector = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Proporção de corte
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // Proporção de corte
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);    }
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
          <MaterialIcons name="add-photo-alternate" size={225} color="#1E2E57" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 225,
    height: 225,
    borderRadius: 10,
  },
});

export default ImageSelector;
