import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getPublicacao, getUser, getEvento, setUserAttribute } from "../utils/gets";
import { useRouter } from "expo-router";
import { userID } from "./(tabs)";
import { useGlobalSearchParams } from "expo-router"

async function checkLikes(user, idPubli){
  if(!("curtidas" in user)){
    await setUserAttribute(user.doc_id, "curtidas", [])
    return false
  }

  return user.curtidas.includes(idPubli)
}

export default function publicacao() {
  const [color, setColor] = useState('#d3d3d3')
  const [publicacao, setPublicacao] = useState({})
  const [donoPubli, setDonoPubli] = useState({})
  const [evento, setEvento] = useState({})
  const [user, setUser] = useState({})
  const [render, setRender] = useState(false)
 
  const router =  useRouter()

  //const idPublicacao = "FRYmEDnQNrd3S54NX2NqAn0hjyC3_1719258301580"
  const { item } = useGlobalSearchParams()
  const idPublicacao = JSON.parse(item).idPublicacao

  useEffect(() => {
    async function fetchData(){
      const fetchedPubli = await getPublicacao(idPublicacao)
      const fetchedDonoPubli = await getUser(fetchedPubli.idDono)
      const fetchedEvent = await getEvento(fetchedPubli.eventos[0])
      const fetchedUser = await getUser(userID)
      const liked = await checkLikes(fetchedUser, idPublicacao)

      if(liked){
        setColor('#E10505')
      }

      setPublicacao(fetchedPubli)
      setDonoPubli(fetchedDonoPubli)
      setEvento(fetchedEvent)
      setUser(fetchedUser)
      setRender(true)
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: publicacao.imageUrl }}
          style={styles.image}
          alt="imagem do evento"
        />
      </View>

      <View style={styles.publiCreatorContainer}>
        <Ionicons name="person-circle" size={40} color="#7591D9"/>
        <Text style={styles.creatorName}>{donoPubli.nomeCompleto}</Text>
      </View>

      <View style={styles.publiCommentContainer}>
        <Text style={styles.publiComment}>
          {publicacao.descricaoPublicacao}
        </Text>

        {render && <View style={styles.buttonsContainer}>
          <Ionicons 
            name="heart-circle" 
            size={60} 
            color={color} 
            style={{marginRight: 25, marginTop: 10}}
            onPress={ async () => {
              const likedPubli = await checkLikes(user, idPublicacao)
              let likedList = user.curtidas

              if(!likedPubli){
                likedList.push(idPublicacao)
                await setUserAttribute(user.doc_id, "curtidas", likedList)
                setColor('#E10505')
              }
              else{
                likedList = likedList.filter((id) => id !== idPublicacao)
                await setUserAttribute(user.doc_id, "curtidas", likedList)
                setColor('#d3d3d3')
              }

              user.curtidas = likedList
            }}
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text 
              style={styles.submitBtnText}
              onPress={() => router.push({ pathname: 'evento', params: { item: JSON.stringify(evento) } })}
            >
              Sobre o evento
            </Text>
          </TouchableOpacity>
        </View>}

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    height: "40%",
    marginTop: 30
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },

  publiCreatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },

  creatorName: {
    color: '#0F2355',
    fontWeight: 'bold'
  },

  publiCommentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5
  },

  publiComment: {
    color: '#0F2355',
    fontWeight: 'bold'
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  submitBtn: {
    backgroundColor: "#0F2355",
    borderRadius: 25,
    padding: 15,
   
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})