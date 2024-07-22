import { db } from "../configs/firebaseConfigs";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(key) {
  try {
    const userDocRef = doc(db, "usuarios", key);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        id: data.uid,
        nome: data.nomeCompleto,
        tipo: data.tipoUsuario,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
