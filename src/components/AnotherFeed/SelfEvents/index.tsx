import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { styles } from "./styles";

import { SelfEventsProps } from "./selfEvents";
import { SelfEvent } from "../SelfEvent";
import { useEffect, useState } from "react";
import { getAnotherEvents } from "../../../utils/another_posts";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export function SelfEvents({ uid }) {
  const [selfEvents, setSelfEvents] = useState<SelfEventsProps[]>([]);

  useEffect(() => {
    async function fetchSelfEvents() {
      const fetchedEvents = await getAnotherEvents(uid);
      console.log(fetchedEvents);
      setSelfEvents(fetchedEvents);
    }

    fetchSelfEvents();
  }, []);

  function eventsByColumn(column: "right" | "left") {
    const rest = column === "left" ? 0 : 1;
    return selfEvents
      .filter((_, index) => index % 2 === rest)
      .map((evento) => <SelfEvent key={evento.id} selfEvent={evento} />);
  }

  return (
    //DEFININDO AS COLUNAS DO FEED: *scrollView ativa a rolagem da tela
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      <View style={styles.container}>
        {selfEvents.length != 0 ? (
          <>
            <View style={styles.column}>{eventsByColumn("left")}</View>
            <View style={styles.column}>{eventsByColumn("right")}</View>
          </>
        ) : (
          <View style={styles.noEventsContainer}>
            <MaterialCommunityIcons
              name="folder-image"
              size={110}
              color={"#a9a9a9"}
            />
            <Text style={styles.noEventsText}>
              Seus eventos aparecerão aqui!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
