import { db, storage } from "../configs/firebaseConfigs";
import { collection, doc, getDocs } from "firebase/firestore";
import {userID, userData} from "./../app/(tabs)/index"

export async function getUser(){
    const rawUsers = await getDocs(collection(db, "usuarios"))

    const allUsers = rawUsers.docs.map((doc) => {
        const data = doc.data();
        // console.log("User Data:", userID);
        // console.log(userData.uid);
        return {
            id: data.uid,
            nome: data.tipoUsuario == "Pessoa" ? data.nomeUsuario : data.nomeCompleto
        };
    }
);

const self_user = allUsers.filter(doc => doc.id == userID)

return self_user

}