import { db, storage } from "../configs/firebaseConfigs";
import { collection, doc, getDocs } from "firebase/firestore";
import {userID, userData} from "./../app/(tabs)/index"

export async function getUser(){
    const rawUsers = await getDocs(collection(db, "usuarios"))

    const allUsers = rawUsers.docs.map((doc) => {
        const data = doc.data();
        return {
            docID: doc.id,
            id: data.uid,
            tipoUsuario: data.tipoUsuario,
            nome: data.tipoUsuario == "Pessoa" ? data.nomeUsuario : data.nomeCompleto,
            nomeCompleto: data.nomeCompleto,
            nomeUsuario: data.nomeUsuario,
            dataInicio: data.dataInicio,
            imageUrl: data.imageUrl??"",
            seguidores:data.seguidores??[],
            eventosApoiados:data.eventosApoiados??[]
        };
    }
);

const self_user = allUsers.filter(doc => doc.id == userID)

return self_user

}