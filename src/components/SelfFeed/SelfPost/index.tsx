import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { SelfPostProps } from "./selfPost";
import { styles } from "./styles";
import { useRouter } from "expo-router";

type Props = {
  selfPost: SelfPostProps;
};

export function SelfPost({ selfPost }: Props) {
  //define o tamanho que a imagem vai ser exibida
  const [aspectRatio, setAspectRatio] = useState(1);
  const router = useRouter()

  useEffect(() => {
    if (selfPost.image) {
      Image.getSize(selfPost.image, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  });

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push({ pathname: '../publicacao', params: { item: JSON.stringify(selfPost.data) }})}
    >
      <Image
        source={{ uri: selfPost.image }}
        style={[styles.image, { aspectRatio }]}
      />
    </TouchableOpacity >
  );
}
