import { Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { AnotherPostProps } from "./AnotherPost";
import { styles } from "./styles";

type Props = {
  AnotherPost: AnotherPostProps;
};

export function AnotherPost({ AnotherPost }: Props) {
  //define o tamanho que a imagem vai ser exibida
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (AnotherPost.image) {
      Image.getSize(AnotherPost.image, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: AnotherPost.image }}
        style={[styles.image, { aspectRatio }]}
      />

      <View style={styles.footer}>
        <Text style={styles.title}>{AnotherPost.title}</Text>
        <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
      </View>
    </View>
  );
}
