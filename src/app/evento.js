import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useGlobalSearchParams, router, useRouter } from "expo-router";

import { getEvento, getUser, setUserAttribute } from "../utils/gets";
import { getForumByEventID, setForumAttribute } from "../utils/forum";
import { userID } from "./(tabs)";

// botão de voltar para o feed
const feedNavigate = () => {
  router.back();
};

const EventStatus = ({ isFinished }) => {
  let color = "#03AA00";
  let icon = "access-time-filled";
  let text = "Evento em andamento";

  if (isFinished) {
    color = "#B80000";
    icon = "check-circle";
    text = "Evento finalizado";
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 28,
        marginBottom: 5,
        marginTop: 5
      }}
    >
      <MaterialIcons name={icon} size={24} color={color} />
      <Text style={{ color: color, marginLeft: 5, fontWeight: "bold" }}>
        {text}
      </Text>
    </View>
  );
};

const PartcipateButton = ({ isParticipating, onPress }) => {
  let text = "Participar";
  let backgroundColor = "#03AA00";
  let width = "80%";

  if (isParticipating) {
    text = "Participando";
    backgroundColor = "#0F2355";
    width = "40%";
  }

  return (
    <TouchableOpacity
      style={[
        styles.submitBtn,
        { backgroundColor: backgroundColor, width: width },
      ]}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

async function checkEvents(user, idEvento) {
  if (!("eventosApoiados" in user)) {
    await setUserAttribute(user.doc_id, "eventosApoiados", []);
    return false;
  }

  return user.eventosApoiados.includes(idEvento);
}

export default function evento() {
  const [isParticipating, setIsParticipating] = useState(false);
  const [eventIsFinish, setEventIsFinish] = useState(false);
  const [render, setRender] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [evento, setEvento] = useState({});
  const [instituicao, setInstuicao] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();

  const { item } = useGlobalSearchParams();
  const idEvento = JSON.parse(item).idEvento;

  useEffect(() => {
    async function fetchDataEvent() {
      const fetchedEvento = await getEvento(idEvento);
      const fetchedInst = await getUser(fetchedEvento.idDono);
      const fetchedUser = await getUser(userID);
      const participate = await checkEvents(fetchedUser, idEvento);

      const [day, month, year] = fetchedEvento.finalEvento.split("/");
      const endDate = new Date(year, month - 1, day);

      setEvento(fetchedEvento);
      setInstuicao(fetchedInst);
      setEventIsFinish(new Date() > endDate);
      setIsParticipating(participate);
      setUser(fetchedUser);
      setImageUrl(fetchedInst.imageUrl ?? null)
      setRender(true);
    }

    fetchDataEvent()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backIcon}>
        <MaterialIcons
          name="chevron-left"
          size={45}
          color="#0F2355"
          onPress={feedNavigate}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: evento.imageUrl }}
          style={styles.image}
          alt="imagem do evento"
        />
      </View>

      <View style={styles.eventInfoContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.eventTitle}>{evento.nomeEvento}</Text>
        </View>

        <View style={styles.eventCreatorContainer}>
          {render && 
          <TouchableOpacity onPress={() => router.push({pathname: "./profile2", params: { item: JSON.stringify(instituicao) }})}>
            {imageUrl !== null 
              ?
              <Image source={{ uri: imageUrl }} style={{height: 32, width: 32, borderRadius: 100, marginRight: 10, marginLeft: 2}}/>
              : 
              <Ionicons name="person-circle" size={40} color="#7591D9" />
            }
          </TouchableOpacity>}
          <Text style={styles.creatorName}>{instituicao.nomeCompleto}</Text>
        </View>

        <EventStatus isFinished={eventIsFinish} />

        {render && !eventIsFinish && (
          <View style={styles.buttonsContainer}>
            <PartcipateButton
              isParticipating={isParticipating}
              onPress={async () => {
                const participateInEvent = await checkEvents(user, idEvento);
                const forum = await getForumByEventID(idEvento)
                let eventosApoiados = user.eventosApoiados;

                if (!participateInEvent) {
                  eventosApoiados.push(idEvento);
                  await setUserAttribute(
                    user.doc_id,
                    "eventosApoiados",
                    eventosApoiados
                  );
                  
                  const participantes = forum.participantes
                  participantes.push(userID)
                  setForumAttribute(forum.doc_id, "participantes", participantes)

                  user.eventosApoiados = eventosApoiados;
                  setIsParticipating(true);
                } else {
                  Alert.alert(
                    "Sair do evento",
                    "Não deseja mais participar do evento?",
                    [
                      {
                        text: "Tirar apoio",
                        onPress: async () => {
                          eventosApoiados = eventosApoiados.filter(
                            (e) => e !== idEvento
                          );
                          await setUserAttribute(
                            user.doc_id,
                            "eventosApoiados",
                            eventosApoiados
                          );

                          const participantes = forum.participantes
                          setForumAttribute(forum.doc_id, "participantes", participantes.filter(e => e !== userID))

                          user.eventosApoiados = eventosApoiados;
                          setIsParticipating(false);
                        },
                      },
                      { text: "Continuar apoiando" },
                    ]
                  );
                }
              }}
            />

            {isParticipating && (
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 25,
                  },
                ]}

                onPress={() => router.push({
                  pathname: "./forum",
                  params: {idEvento: id, title: evento.nomeEvento}
                })}
              >
                <Ionicons 
                  name="chatbox-sharp" 
                  size={18} 
                  color="#FFF" 
                />
                <Text style={styles.submitBtnText}>Chat</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitleContainer}>Sobre</Text>

      <ScrollView style={{maxHeight: "25%"}}>
        <View style={styles.aboutInfoContainer}>
          <MaterialIcons name="text-snippet" size={22} color="#0F2355" />
          <Text style={styles.aboutTitle}>Descrição</Text>
        </View>

        <Text style={styles.aboutInfoText}>{evento.descricaoEvento}</Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.line} />
        </View>

        <View style={styles.aboutInfoContainer}>
          <MaterialIcons name="calendar-month" size={24} color="#0F2355" />
          <Text style={styles.aboutTitle}>Data de início</Text>
        </View>

        <Text style={styles.aboutInfoText}>{evento.inicioEvento}</Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.line} />
        </View>

        <View style={styles.aboutInfoContainer}>
          <MaterialIcons name="calendar-month" size={24} color="#0F2355" />
          <Text style={styles.aboutTitle}>Data de termíno</Text>
        </View>

        <Text style={styles.aboutInfoText}>{evento.finalEvento}</Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.line} />
        </View>
      </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: 6,
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    height: "30%",
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  eventInfoContainer: {
    backgroundColor: "#fff",
  },

  creatorName: {
    color: "#0F2355",
    fontWeight: "bold",
  },

  eventTitle: {
    color: "#0F2355",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
  },

  eventCreatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 15,
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  aboutContainer: {
    backgroundColor: "#6A92FA21",
    height: "100%",
  },

  aboutTitleContainer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F2355",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },

  aboutInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },

  aboutTitle: {
    color: "#0F2355",
    fontWeight: "bold",
  },

  aboutInfoText: {
    marginLeft: 40,
    color: "#0F2355",
  },

  line: {
    width: "90%",
    backgroundColor: "#0F2355",
    height: 1,
    marginTop: 7,
    marginBottom: 7,
  },
});
