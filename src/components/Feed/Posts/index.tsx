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

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}
