import { db, storage } from "../configs/firebaseConfigs";
import { collection, doc, getDocs } from "firebase/firestore";

export async function getPosts() {
  const eventosSnapshot = await getDocs(collection(db, "eventos"));
  const publicacoesSnapshot = await getDocs(collection(db, "publicacoes"));

  // Mapeia os documentos para o formato desejado
  const eventosRecuperados = eventosSnapshot.docs.map((doc) => {
    const data = doc.data();
    // console.log("Evento Data:", data); // Log para depuração
    return {
      id: doc.id, // ID único do documento
      title: data.nomeEvento, // Nome do evento
      image: data.imageUrl, // URL da imagem do evento
    };
  });
  const publicacoesRecuperadas = publicacoesSnapshot.docs.map((doc) => {
    const data = doc.data();
    // console.log("Publicacao Data:", data); // Log para depuração
    return {
      id: doc.id, // ID único do documento
      title: data.descricaoPublicacao, // Descrição da publicação
      image: data.imageUrl, // URL da imagem da publicação
    };
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
  // lista de publicacoes recuperados e formatadas para o feed
  const publicacoesRecuperadasFormatadas = publicacoesRecuperadas.map(
    (publicacoes, index) => ({
      id: index + 1, // id para a separação no feeed
      idPublicacao: publicacoes.idPublicacao, // id do publicacao no banco de dados
      title: publicacoes.descricaoPublicacao,
      image: publicacoes.imageUrl,
    })
  );

  //console.log(eventosRecuperadosFormatados);
  //return eventosRecuperadosFormatados;
  return [...eventosRecuperados, ...publicacoesRecuperadas];
}
