import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { styles } from "./styles";

import { SelfEventsProps } from "./selfEvents"; 
import { SelfEvent } from "../SelfEvent";
import { useEffect, useState } from "react";
import { getSelfEvents } from "../../../utils/self_posts";


export function SelfEvents(){

const [selfEvents, setSelfEvents] = useState<SelfEventsProps[]>([])

    useEffect(() => {
        async function fetchSelfEvents(){
            const fetchedEvents = await getSelfEvents();
            console.log(fetchedEvents)
            setSelfEvents(fetchedEvents)
        }

        fetchSelfEvents();
    }, []);

    function eventsByColumn(column: "right" | "left"){
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
            <View style={styles.column}>{eventsByColumn("left")}</View>
            <View style={styles.column}>{eventsByColumn("right")}</View>
          </View>
        </ScrollView>
      );
}