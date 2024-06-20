import { View, FlatList, ListRenderItemInfo } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { styles } from "./styles";

import { PostProps } from "../Post/post";
import { Post } from "../Post";
import { getPosts } from "../../../utils/posts";

export function Posts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<PostProps>) => {
    return <Post key={item.id} post={item} />;
  }, []);

  // Adicionando um elemento vazio se o número de posts for ímpar
  const formattedPosts =
    posts.length % 2 === 1
      ? [...posts, { id: "-1", title: "", image: "" }]
      : posts;

  return (
    <FlatList
      data={formattedPosts}
      renderItem={({ item }) =>
        item.id !== "-1" ? (
          <Post key={item.id} post={item} />
        ) : (
          <View style={styles.emptyPost} />
        )
      }
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}
