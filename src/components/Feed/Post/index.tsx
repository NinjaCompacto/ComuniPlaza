import { Image, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { PostProps } from "./post";
import { styles } from "./styles";

type Props = {
  post: PostProps;
};

const PostComponent = ({ post }: Props) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageError, setImageError] = useState(false);
  const router = useRouter()

  const path = post.type === 'E' ? '../evento' : '../publicacao';

  useEffect(() => {
    if (post.image) {
      Image.getSize(
        post.image,
        (width, height) => {
          setAspectRatio(width / height);
          setImageError(false);
        },
        () => {
          console.warn(`Failed to get size for image: ${post.image}`);
          setImageError(true);
        }
      );
    }
  }, [post.image]);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.push({ pathname: path, params: { item: JSON.stringify(post.data)}})}>
      {imageError ? (
        <Text>Failed to load image</Text>
      ) : (
        <Image
          source={{ uri: post.image }}
          style={[styles.image, { aspectRatio }]}
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.title}>{post.title}</Text>
        <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
      </View>
    </TouchableOpacity>
  );
};

//memoização do componente
export const Post = React.memo(PostComponent);
