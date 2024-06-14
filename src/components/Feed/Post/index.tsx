import { Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { PostProps } from "./post";
import { styles } from "./styles";

type Props = {
  post: PostProps;
};

export function Post({ post }: Props) {
  //define o tamanho que a imagem vai ser exibida
  const [aspectRatio, setAspectRatio] = useState(1);
  
  useEffect(() => {
    if (post.image) {
      Image.getSize(post.image, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: post.image }}
        style={[styles.image, { aspectRatio }]}
      />

      <View style={styles.footer}>
        <Text style={styles.title}>{post.title}</Text>
        <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
      </View>
    </View>
  );
}
