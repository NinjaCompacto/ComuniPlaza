import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { styles } from "./styles";

import { SelfPostsProps } from "./../../SelfFeed/SelfPosts/posts";
import { SelfPost } from "../SelfPost";
import { useEffect, useState } from "react";
import { getSelfPosts } from "../../../utils/self_posts";

// export function SelfPosts({ selfPosts }: SelfPostsProps) {
export function SelfPosts() {

  const [selfPosts, setSelfPosts] = useState<SelfPostsProps[]>([])

  useEffect(() => {
    async function fetchSelfPosts(){
      const fetchedPosts = await getSelfPosts();
      setSelfPosts(fetchedPosts)
    }

    fetchSelfPosts();
  }, []);

  //disposições do feed - define qual lado o componente vai renderizar
  function postsByColumn(column: "right" | "left") {
    //resto da divisão -> definir se é impar ou par
    const rest = column === "left" ? 0 : 1;
    return selfPosts
      .filter((_, index) => index % 2 === rest)
      .map((post) => <SelfPost key={post.id} selfPost={post} />);
  }

  return (
    //DEFININDO AS COLUNAS DO FEED: *scrollView ativa a rolagem da tela
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      <View style={styles.container}>
        <View style={styles.column}>{postsByColumn("left")}</View>
        <View style={styles.column}>{postsByColumn("right")}</View>
      </View>
    </ScrollView>
  );
}
