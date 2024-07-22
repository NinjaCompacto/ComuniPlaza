import { forwardRef, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../configs/firebaseConfigs";
import { styles } from "./styles";
import { MenuProps } from "./menu";
import { userID } from "../../app/(tabs)";

export const Menu = forwardRef<BottomSheet, MenuProps>(({ onClose }, ref) => {
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const snapShotUsersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userData = snapShotUsersData.filter((user) => user.uid === userID);
      setUserType(userData[0]?.tipoUsuario || "");
      setIsLoading(false); // Define que o carregamento terminou
    }

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F2355" />
      </View>
    );
  }

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={[0.01, 230]}
      backgroundStyle={styles.container}
      handleComponent={() => null}
    >
      {userType === "Pessoa" ? (
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
            <View>
              <Link href={"../cadastro/publicacao"} asChild>
                <TouchableOpacity style={styles.publicaButtom}>
                  <MaterialCommunityIcons
                    name="newspaper-plus"
                    color={"#0F2355"}
                    size={45}
                  />
                </TouchableOpacity>
              </Link>
              <Text style={styles.publicaText}>Publicar</Text>
            </View>
          </View>
        </View>
      ) : (
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
            <View>
              <Link href={"../cadastro/publicacao"} asChild>
                <TouchableOpacity style={styles.publicaButtom}>
                  <MaterialCommunityIcons
                    name="newspaper-plus"
                    color={"#0F2355"}
                    size={45}
                  />
                </TouchableOpacity>
              </Link>
              <Text style={styles.publicaText}>Publicar</Text>
            </View>

            <View>
              <Link href={"../cadastro/evento"} asChild>
                <TouchableOpacity style={styles.publicaButtom}>
                  <MaterialCommunityIcons
                    name="sign-direction-plus"
                    color={"#0F2355"}
                    size={45}
                  />
                </TouchableOpacity>
              </Link>
              <Text style={styles.eventoText}>Criar Evento</Text>
            </View>
          </View>
        </View>
      )}
    </BottomSheet>
  );
});
