import { db } from "../configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

export async function getEvento(idEvento){
    const eventosSnap = await getDocs(collection(db, "eventos"));
    const evento = eventosSnap.docs.filter((doc) => doc.data().idEvento === idEvento)[0]

    return evento.data()
}

export async function getDonoEvento(idDono){
    const usersSnap = await getDocs(collection(db, "usuarios"));

    const user = usersSnap.docs.filter((doc) => doc.data().uid === idDono)[0]

    return {
        name: user.data().nomeCompleto
    }
}