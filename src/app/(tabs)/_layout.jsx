import { useRef } from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import BottomSheet from "@gorhom/bottom-sheet";
import { Menu } from "../../components/Menu";
import evento from "../cadastro/evento";

export default function TabLayout() {
  const bottomSheetRef = useRef(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current.snapToIndex(0);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#0F2355",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="update"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons
                name="add-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
          listeners={() => ({
            tabPress: (event) => {
              event.preventDefault();
              handleBottomSheetOpen();
            },
          })}
        />
        <Tabs.Screen
          name="messages"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="forum" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <Menu ref={bottomSheetRef} onClose={handleBottomSheetClose} />
    </View>
  );
}
