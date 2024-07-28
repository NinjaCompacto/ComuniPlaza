import {Image , Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { SelfEventProps } from "./selfEvent";
import { styles } from "./styles";
import { useRouter } from "expo-router";

type Props = {
    selfEvent: SelfEventProps
}

export function SelfEvent({ selfEvent }: Props){
    const [aspectRatio, setAspectRatio] = useState(1);
    const router = useRouter()

    useEffect(() => {
        if (selfEvent.image) {
          Image.getSize(selfEvent.image, (width, height) => {
            setAspectRatio(width / height);
          });
        }
    });

    return (
        <TouchableOpacity 
          style={styles.container}
          onPress={() => router.push({ pathname: '../evento', params: { item: JSON.stringify(selfEvent.data) }})}
          >
          <Image
            source={{ uri: selfEvent.image }}
            style={[styles.image, { aspectRatio }]}
          />
    
          <View style={styles.footer}>
            <Text style={styles.title}>{selfEvent.title}</Text>
            <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
          </View>
        </TouchableOpacity>
      );
}

