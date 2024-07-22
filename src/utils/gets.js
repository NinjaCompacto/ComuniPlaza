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

export async function getPublicacao(idPubli){
    console.log(idPubli)
    const publiSnap = await getDocs(collection(db, "publicacoes"));

    const publi = publiSnap.docs.filter((doc) => doc.data().idPublicacao === idPubli)[0]

    return publi.data()
}

export async function setUserAttribute(idUser, attribute, value){
    const userRef = doc(db, "usuarios", idUser);
    const obj = {}

    obj[attribute] = value

    await updateDoc(userRef, obj)
}