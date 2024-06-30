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
  import { getEvento, getDonoEvento } from "../utils/gets";
  
  const EventStatus = ({isFinished}) => { 
    let color = "#03AA00"
    let icon = "access-time-filled"
    let text = "Evento em andamento"
  
    if(isFinished){
      color = "#B80000"
      icon = "check-circle"
      text = "Evento finalizado"
    }
  
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 28}}>
        <MaterialIcons name={icon} size={24} color={color}/>
        <Text style={{color: color, marginLeft: 5, fontWeight: 'bold'}}>{text}</Text>
      </View>
      )
  }
  
  const PartcipateButton = ({isParticipating, onPress}) => {
    let text = "Participar"
    let backgroundColor = "#03AA00"
  
    if(isParticipating){
      text = "Participando"
      backgroundColor = "#0F2355"
    }
  
    return (
      <TouchableOpacity 
        style={[styles.submitBtn, {marginRight: 28, backgroundColor: backgroundColor}]}
        onPress={onPress}
      >
        <Text style={styles.submitBtnText}>{text}</Text>
      </TouchableOpacity>
    )
  }
  
  export default function messages() {
    const [isParticipating, setIsParticipating] = useState(false)
    const [eventIsFinish, setEventIsFinish] = useState(false)
    const [evento, setEvento] = useState({})
    const [instituicao, setInstuicao] = useState({})
    
    const idEvento = "FRYmEDnQNrd3S54NX2NqAn0hjyC3_1719074827007"
    //const idEvento = "UH6R1mtMjDRlJ6fRVPwk0e6XUAm1_1718900467685"
  
    useEffect(() => {
      async function fetchData(idEvento){
        const fetchedEvento = await getEvento(idEvento)
        setEvento(fetchedEvento)
        
        const [day, month, year] = fetchedEvento.finalEvento.split('/')
        const endDate = new Date(year, month-1, day)
        
        setEventIsFinish(new Date() > endDate)
      
        const fetchedUser = await getDonoEvento(fetchedEvento.idDono)
        setInstuicao(fetchedUser)
      } 
  
      fetchData(idEvento)
    }, [])
  
    return (
      <SafeAreaView style={styles.container}>
  
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: evento.imageUrl }}
            style={styles.image}
            alt="imagem do evento"
          />
        </View>
  
        <View style={styles.eventInfoContainer}>
          
          <View style={{alignItems: 'center'}}>
            <Text style={styles.eventTitle}>{evento.nomeEvento}</Text>
          </View>
  
          <View style={styles.eventCreatorContainer}>
            <Ionicons name="person-circle" size={40} color="#7591D9"/>
            <Text style={styles.creatorName}>{instituicao.name}</Text>
          </View>
  
          {/* {console.log(evento.finalEvento)} */}
          <EventStatus isFinished={eventIsFinish}/>
  
          <View style={styles.buttonsContainer}>
            <PartcipateButton 
              isParticipating={isParticipating} 
              onPress={() => setIsParticipating(!isParticipating)}
            />
  
            <TouchableOpacity style={[styles.submitBtn, {flexDirection: 'row', alignItems: 'center'}]}>
              <Ionicons name="chatbox-sharp" size={18} color="#FFF" style={{marginRight: 5}}/>
              <Text style={styles.submitBtnText}>Chat</Text>
            </TouchableOpacity>
          </View>
  
        </View>
  
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitleContainer}>Sobre</Text>
  
          <View style={styles.aboutInfoContainer}>
            <MaterialIcons name="text-snippet" size={22} color="#0F2355" />
            <Text style={styles.aboutTitle}>Descrição</Text>
          </View>
  
          <Text style={styles.aboutInfoText}>{evento.descricaoEvento}</Text>
          <View style={{width: '100%', alignItems: 'center'}}><View style={styles.line}/></View>
          
          <View style={styles.aboutInfoContainer}>
            <MaterialIcons name="calendar-month" size={24} color="#0F2355" />
            <Text style={styles.aboutTitle}>Data de início</Text>
          </View>
  
          <Text style={styles.aboutInfoText}>{evento.inicioEvento}</Text>
          <View style={{width: '100%', alignItems: 'center'}}><View style={styles.line}/></View>
          
          <View style={styles.aboutInfoContainer}>
            <MaterialIcons name="calendar-month" size={24} color="#0F2355" />
            <Text style={styles.aboutTitle}>Data de termíno</Text>
          </View>
  
          <Text style={styles.aboutInfoText}>{evento.finalEvento}</Text>
          <View style={{width: '100%', alignItems: 'center'}}><View style={styles.line}/></View>
  
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
      marginTop: 30,
      height: '30%',
    },
  
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain'
    },
  
    eventInfoContainer: {
      backgroundColor: '#fff',
    },

    creatorName: {
      color: '#0F2355',
      fontWeight: 'bold'
    },
  
    eventTitle: {
      color: '#0F2355',
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 5
    },
  
    eventCreatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
    },
  
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
  
    submitBtn: {
      backgroundColor: "#0F2355",
      borderRadius: 10,
      padding: 15,
      paddingLeft: 5,
      paddingRight: 5,
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 15
    },
  
    submitBtnText: {
      color: "#FFF",
      fontSize: 15,
      fontWeight: "bold",
    },
  
    aboutContainer: {
      backgroundColor: '#6A92FA21',  
      height: '100%'
    },
  
    aboutTitleContainer: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0F2355',
      marginLeft: 20,
      marginTop: 10,
      marginBottom: 5
    },
  
    aboutInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 25
    },
  
    aboutTitle: {
      color: '#0F2355',
      fontWeight: 'bold'
    },
  
    aboutInfoText: {
      marginLeft: 40,
      color: '#0F2355',
    },
  
    line: {
      width: '90%',
      backgroundColor: '#0F2355',
      height: 1,
      marginTop: 7,
      marginBottom: 7
    }
  })