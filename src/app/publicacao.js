import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function messages() {
  const [color, setColor] = useState('#d3d3d3')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <MaterialIcons
          name="chevron-left"
          size={45}
          color="#0F2355"
          //style={styles.backIcon}
        />

        {/* <Image 
          source={{ uri: evento.imageUrl }}
          style={styles.image}
          alt="imagem do evento"
        /> */}
      </View>

      <View style={styles.publiCreatorContainer}>
        <Ionicons name="person-circle" size={40} color="#7591D9"/>
        <Text style={styles.creatorName}>Instituto ABC</Text>
      </View>

      <View style={styles.publiCommentContainer}>
        <Text style={styles.publiComment}>
          Amor em cada tigela, carinho em cada pelo. 
          Junte-se a nós para doar alimentos e banhos 
          a cães de rua necessitados. 🐾❤️ #AjudeUmPeludo
        </Text>

        <View style={styles.buttonsContainer}>
          <Ionicons 
            name="heart-circle" 
            size={60} 
            color={color} 
            style={{marginRight: 25, marginTop: 10}}
            onPress={() => {
              if(color === '#d3d3d3') setColor('#E10505')
              else setColor('#d3d3d3')
            }}
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Sobre o evento</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#d3d3d3',
    height: "40%",
    marginTop: 30
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