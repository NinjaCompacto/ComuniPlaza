import { Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { SelfPostProps } from "./selfPost";
import { styles } from "./styles";

type Props = {
  selfPost: SelfPostProps;
};

export function SelfPost({ selfPost }: Props) {
  //define o tamanho que a imagem vai ser exibida
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (selfPost.image) {
      Image.getSize(selfPost.image, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: selfPost.image }}
        style={[styles.image, { aspectRatio }]}
      />

      <View style={styles.footer}>
        <Text style={styles.title}>{selfPost.title}</Text>
        <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
      </View>
    </View>
  );
}
