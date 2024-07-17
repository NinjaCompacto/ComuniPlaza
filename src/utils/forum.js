import { db } from "../configs/firebaseConfigs";
import { collection, addDoc, getDocs, doc, updateDoc} from "firebase/firestore";
import { getUser, getEvento } from "./gets";
import { userID } from "../app/(tabs)";

export async function createForum(idEvento){
    await addDoc(collection(db, "foruns"), {
        idForum: `${userID}_${Date.now()}`,
        idEvento: idEvento,
        participantes: [],
        mensagens: []
    })
}

export async function getForumByEventID(idEvento){
    const forunsSnap = await getDocs(collection(db, "foruns"));
    const forum = forunsSnap.docs.filter((doc) => doc.data().idEvento === idEvento)[0]

    return {doc_id: forum.id, ...forum.data()}
}

export async function listForuns(idUser){
    const userEvents = (await getUser(idUser)).eventosApoiados
    const userForuns = []

    for(const eventId of userEvents){
        const event = await getEvento(eventId);
        userForuns.push({id: eventId, image: event.imageUrl, title: event.nomeEvento})
    }

    return userForuns
}

export async function setForumAttribute(idForum, attribute, value){
    const forumrRef = doc(db, "foruns", idForum);
    
    await updateDoc(forumrRef, {[attribute]: value})
}