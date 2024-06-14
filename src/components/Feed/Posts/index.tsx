import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { styles } from "./styles";

import { PostsProps } from "./posts";
import { Post } from "../Post";

export function Posts({ posts }: PostsProps) {
  //disposições do feed - define qual lado o componente vai renderizar
  function postsByColumn(column: "right" | "left") {
    //resto da divisão -> definir se é impar ou par
    const rest = column === "left" ? 0 : 1;
    return posts
      .filter((_, index) => index % 2 === rest)
      .map((post) => <Post key={post.id} post={post} />);
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
