import {Image , Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { SelfEventProps } from "./selfEvent";
import { styles } from "./styles";

type Props = {
    selfEvent: SelfEventProps
}

export function SelfEvent({ selfEvent }: Props){
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (selfEvent.image) {
          Image.getSize(selfEvent.image, (width, height) => {
            setAspectRatio(width / height);
          });
        }
    });

    return (
        <View style={styles.container}>
          <Image
            source={{ uri: selfEvent.image }}
            style={[styles.image, { aspectRatio }]}
          />
    
          <View style={styles.footer}>
            <Text style={styles.title}>{selfEvent.title}</Text>
            <MaterialIcons name="keyboard-control" size={16} color={"#0F2355"} />
          </View>
        </View>
      );
}

