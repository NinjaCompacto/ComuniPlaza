import { db } from "../configs/firebaseConfigs";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export async function getEvento(idEvento){
    const eventosSnap = await getDocs(collection(db, "eventos"));
    const evento = eventosSnap.docs.filter((doc) => doc.data().idEvento === idEvento)[0]

    return evento.data()
}

export async function getUser(idUser){
    const usersSnap = await getDocs(collection(db, "usuarios"));

    const user = usersSnap.docs.filter((doc) => doc.data().uid === idUser)[0]
    
    return {doc_id: user.id, ...user.data()}
}

export async function createEventList(idUser){
    const userRef = doc(db, "usuarios", idUser);

    await updateDoc(userRef, {
        eventosApoiados: []
    })
}

export async function modifieEventList(idUser, list){
    const userRef = doc(db, "usuarios", idUser);

    await updateDoc(userRef, {
        eventosApoiados: list
    })
}