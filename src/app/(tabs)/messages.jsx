import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { listForuns } from "../../utils/forum";
import { userID } from ".";

const ForumView = ({image, text, idEvento}) => {
  const router = useRouter()

  return (
    <TouchableOpacity 
      style={styles.forumViewContainer} 
      onPress={() => router.push({
        pathname: "../forum",
        params: {idEvento: idEvento, title: text}
      })}
    >
      <Image source={{ uri: image }} style={{height: 50, width: 50, borderRadius: 50}}/>
      <Text style={styles.forumViewText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default function messages() {
  const [data, setData] = useState(null)
   
  useEffect(() => {
    async function fetchData(){
      const fetchedData = await listForuns(userID);
      setData(fetchedData)
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fóruns de Eventos</Text>
      </View>

     { data === null && <ActivityIndicator size="large" color="#7591D9" style={{marginTop: 25, marginBottom: 25}}/>}
      {data !== null && <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ForumView text={item.title} image={item.image} idEvento={item.id}/>}
      />}

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
    marginLeft: 10,
    width: "80%"
  }
})