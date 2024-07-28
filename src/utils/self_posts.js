import { db, storage } from "../configs/firebaseConfigs";
import { collection, doc, getDocs } from "firebase/firestore";
import { userData, userID } from "../app/(tabs)";

export async function getSelfPosts() {
  const publicacoesSnapshot = await getDocs(collection(db, "publicacoes"));

  // Mapeia os documentos para o formato desejado
  const publicacoesRecuperadas = publicacoesSnapshot.docs.map((doc) => {
    const data = doc.data();
    // console.log("UserId:",userData.uid)
    // console.log("idDono:",data.idDono)
    if (data.idDono == userData.uid){
      // console.log("?")
      return {
        id: doc.id, // ID único do documento
        title: data.descricaoPublicacao, // Descrição da publicação
        image: data.imageUrl, // URL da imagem da publicação
        data: {doc_id: doc.id, ...data}
      }
    }
  }).filter(function( element ) {
    return element !== undefined;
 });

  // lista de publicacoes recuperados e formatadas para o feed
  const publicacoesRecuperadasFormatadas = publicacoesRecuperadas.map(
    (publicacoes, index) => ({
      id: index + 1, // id para a separação no feeed
      idPublicacao: publicacoes.idPublicacao, // id do publicacao no banco de dados
      title: publicacoes.descricaoPublicacao,
      image: publicacoes.imageUrl,
    })
  );

  // console.log(eventosRecuperadosFormatados);
  // return eventosRecuperados;
  return publicacoesRecuperadas;
}

export async function getSelfEvents() {
  const eventosSnapshot = await getDocs(collection(db, "eventos"));

  // Mapeia os documentos para o formato desejado
  const eventosRecuperados = eventosSnapshot.docs.map((doc) => {
    const data = doc.data();
    if(data.idEvento.split('_')[0] == userData.uid){
      return {
        id: doc.id, // ID único do documento
        title: data.nomeEvento, // Nome do evento
        image: data.imageUrl, // URL da imagem do evento
        data: {doc_id: doc.id, ...data}
      };
    }
  }).filter(function( element ) {
    return element !== undefined;
 });

  // lista de eventos recuperados e formatados para feed
  const eventosRecuperadosFormatados = eventosRecuperados.map(
    (evento, index) => ({
      id: index + 1, // id para a separação no feeed
      idEvento: evento.idEvento, // id do evento no banco de dados
      title: evento.nomeEvento,
      image: evento.imageUrl,
    })
  );

  return eventosRecuperados
}

export const SELFPOSTS = [
  {
    id: "1",
    title: "Motoca",
    image:
      "https://images.pexels.com/photos/25255204/pexels-photo-25255204/free-photo-of-scooter-vermelha-na-costa-amalfitana.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    title: "Barzin",
    image:
      "https://images.pexels.com/photos/25328876/pexels-photo-25328876/free-photo-of-restaurante-em-paris.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    title: "Mano Urso",
    image:
      "https://images.pexels.com/photos/7515368/pexels-photo-7515368.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "4",
    title: "Papagaio Marrom",
    image:
      "https://images.pexels.com/photos/19581191/pexels-photo-19581191/free-photo-of-natureza-passaro-ave-passarinho.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
