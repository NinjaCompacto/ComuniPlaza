import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ForumView = ({image, text}) => {
  const router = useRouter()

  return (
    <TouchableOpacity style={styles.forumViewContainer} onPress={() => router.push('../forum')}>
      <Ionicons name="person-circle" size={70} color="#7591D9"/>
      <Text style={styles.forumViewText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default function messages() {
  const data = []

  for(let i = 0; i < 20; i++) data.push(`Fórum do Evento Beneficiente ${i+1}`)
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fóruns de Eventos</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.index}
        renderItem={({item}) => <ForumView text={item}/>}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: 'center',
    //alignItems: 'center'
  },

  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#0F2355",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },

  forumViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7591D97D",
    padding: 5,
    marginBottom: 5
  },

  forumViewText: {
    color: "#0F2355",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10
  }
})