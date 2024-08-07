import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { AnotherPostProps } from "./AnotherPost";
import { styles } from "./styles";
import { useRouter } from "expo-router";

type Props = {
  AnotherPost: AnotherPostProps;
};

export function AnotherPost({ AnotherPost }: Props) {
  //define o tamanho que a imagem vai ser exibida
  const [aspectRatio, setAspectRatio] = useState(1);
  const router = useRouter()

  useEffect(() => {
    if (AnotherPost.image) {
      Image.getSize(AnotherPost.image, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  });

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push({ pathname: '../publicacao', params: { item: JSON.stringify(AnotherPost.data) }})}
      >
      <Image
        source={{ uri: AnotherPost.image }}
        style={[styles.image, { aspectRatio }]}
      />
    </TouchableOpacity>
  );
}
