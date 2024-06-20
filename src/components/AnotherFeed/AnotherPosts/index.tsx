import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { styles } from "./styles";

import { AnotherPostProps } from "./anotherPosts";
import { AnotherPost } from "../AnotherPost";
import { useEffect, useState } from "react";
import { getAnotherPosts } from "../../../utils/another_posts";

// export function SelfPosts({ selfPosts }: SelfPostsProps) {
export function AnotherPosts({uid}) {

  const [anotherPosts, setAnotherPosts] = useState<AnotherPostProps[]>([])

  useEffect(() => {
    async function fetchAnotherPosts(){
      const fetchedPosts = await getAnotherPosts(uid);
      setAnotherPosts(fetchedPosts)
    }

    fetchAnotherPosts();
  }, []);

  //disposições do feed - define qual lado o componente vai renderizar
  function postsByColumn(column: "right" | "left") {
    //resto da divisão -> definir se é impar ou par
    const rest = column === "left" ? 0 : 1;
    return anotherPosts
      .filter((_, index) => index % 2 === rest)
      .map((post) => <AnotherPost key={post.id} AnotherPost={post} />);
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
