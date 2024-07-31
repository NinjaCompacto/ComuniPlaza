import { db } from "../configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

export async function getIntituicoes(name) {
  const usersSnap = await getDocs(collection(db, "usuarios"));

  const instituicoes = usersSnap.docs.filter((doc) => {
    const data = doc.data();

    return (
      data.tipoUsuario === "Instituição" &&
      data.nomeCompleto.toLowerCase().startsWith(name)
    );
  });

  return instituicoes.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.nomeCompleto,
      type: "I",
      data: {doc_id: doc.id, ...data}
    };
  });
}

export async function getUsuarios(name) {
  const usersSnap = await getDocs(collection(db, "usuarios"));

  const instituicoes = usersSnap.docs.filter((doc) => {
    const data = doc.data();

    return (
      data.tipoUsuario === "Pessoa" &&
      data.nomeCompleto.toLowerCase().startsWith(name)
    );
  });

  return instituicoes.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.nomeCompleto,
      type: "P",
      data: {doc_id: doc.id, ...data}
    };
  });
}

export async function getEventos(name) {
  const eventosSnap = await getDocs(collection(db, "eventos"));

  const eventos = eventosSnap.docs.filter((doc) => {
    const data = doc.data();

    return data.nomeEvento.toLowerCase().startsWith(name);
  });

  return eventos.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id, // ID único do documento
      idEvento: data.idEvento,
      title: data.nomeEvento, // Nome do evento
      image: data.imageUrl, // URL da imagem do evento
      type: "E",
      data: {doc_id: doc.id, ...data}
    };
  });
}
