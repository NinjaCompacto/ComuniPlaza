import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  noPostsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  noPostsText: {
    color: "#a9a9a9",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "#D1DEFF",
  },
  column: {
    flex: 1,
  },
  list: {
    paddingTop: 13,
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 5,
  },
});
