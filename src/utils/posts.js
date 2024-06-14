import { db, storage } from "../configs/firebaseConfigs";
import { collection ,doc, getDocs } from "firebase/firestore";

export async function getPosts(){
  const eventosSnapshot = await getDocs(collection(db, "eventos"));
  const publicacoesSnapshot = await getDocs(collection(db, "publicacoes"));
 
  // Mapeia os documentos para o formato desejado
  const eventosRecuperados = eventosSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  const publicacoesRecuperadas = publicacoesSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  
  
  
  // lista de eventos recuperados e formatados para feed
  const eventosRecuperadosFormatados = eventosRecuperados.map((evento, index) => ({
    id: index + 1, // id para a separação no feeed
    idEvento: evento.idEvento, // id do evento no banco de dados
    title: evento.nomeEvento,
    image: evento.imageUrl
  }));
  // lista de publicacoes recuperados e formatadas para o feed
  const publicacoesRecuperadasFormatadas = publicacoesRecuperadas.map((publicacoes, index) => ({
    id: index + 1, // id para a separação no feeed
    idPublicacao: publicacoes.idPublicacao, // id do publicacao no banco de dados
    title: publicacoes.descricaoPublicacao,
    image: publicacoes.imageUrl,
  }));

  console.log(eventosRecuperadosFormatados ); 
  //return eventosRecuperadosFormatados;

};

export const POSTS = [
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
  {
    id: "5",
    title: "Favela",
    image:
      "https://images.pexels.com/photos/20526795/pexels-photo-20526795/free-photo-of-mar-preto-e-branco-p-b-predios.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "6",
    title: "Nina",
    image:
      "https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "7",
    title: "Orla da Ponta Negra",
    image:
      "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
