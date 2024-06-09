import { forwardRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { MenuProps } from "./menu";
import { styles } from "./styles";

export const Menu = forwardRef<BottomSheet, MenuProps>(({ onClose }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={[0.01, 230]}
      backgroundStyle={styles.container}
      handleComponent={() => null}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons
            name="close"
            size={24}
            onPress={onClose}
            style={styles.close}
          />
          <Text style={styles.title}>Você pode</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity>
            <Link href={"../cadastro/publicacao"}>
              <View style={styles.publicaButtom}>
                <MaterialCommunityIcons
                  name="newspaper-plus"
                  color={"#0F2355"}
                  size={45}
                />
              </View>
            </Link>
            <Text style={styles.publicaText}>Publicar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Link href={"../cadastro/evento"}>
              <View style={styles.publicaButtom}>
                <MaterialCommunityIcons
                  name="sign-direction-plus"
                  color={"#0F2355"}
                  size={45}
                />
              </View>
            </Link>
            <Text style={styles.eventoText}>Criar Evento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
});
