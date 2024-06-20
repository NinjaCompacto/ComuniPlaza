import { db, storage } from "../configs/firebaseConfigs";
import { collection, doc, getDocs } from "firebase/firestore";
import {userID, userData} from "./../app/(tabs)/index"

export async function getUser(uid){
    const rawUsers = await getDocs(collection(db, "usuarios"))

    const allUsers = rawUsers.docs.map((doc) => {
        const data = doc.data();
        // console.log("User Data:", userID);
        // console.log(userData.uid);
        return {
            id: data.uid,
            nome: data.nomeUsuario
        };
    }
);

const another_user = allUsers.filter(doc => doc.id == uid);

return another_user

}