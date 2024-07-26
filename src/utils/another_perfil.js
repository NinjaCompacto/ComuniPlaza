import { db } from "../configs/firebaseConfigs";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";

export async function getUser(idUser){
  const usersSnap = await getDocs(collection(db, "usuarios"));

  const user = usersSnap.docs.filter((doc) => doc.data().uid === idUser)[0]
  
  return {doc_id: user.id, ...user.data()}
}

export async function updateUser(doc_id, data) {
  try {
    const userDocRef = doc(db, "usuarios", doc_id); // A coleção é "usuarios", ajuste conforme necessário

    // Atualiza o documento existente ou cria um novo documento com os dados fornecidos
    await setDoc(userDocRef, data, { merge: true });

    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
