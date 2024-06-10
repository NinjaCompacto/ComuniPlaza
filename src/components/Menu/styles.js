import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7591D9",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
    fontWeight: "bold",
  },
  close: {
    color: "#FFFFFF",
  },
  options: {
    flexDirection: "row",
    gap: 80,
    marginTop: 32,
  },
  publicaButtom: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#B5C7F5",
    width: 80,
    height: 80,
  },
  publicaText: {
    color: "#FFFFFF",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 15,
    fontWeight: "bold",
  },
  eventoText: {
    color: "#FFFFFF",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
