import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

const EventoTextInputs = ({
  onNomeChange,
  onDescricaoChange,
  onInicioChange,
  onFinalChange,
}) => {
  return (
    <>
      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Nome do Evento</Text>
        <TextInput
          placeholder="Adicione o nome do evento"
          cursorColor={"#0F2355"}
          selectionHandleColor={"#0F2355"}
          selectionColor={"#BCBCBC"}
          onChangeText={onNomeChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Descrição</Text>
        <TextInput
          placeholder="Adicione a descrição do evento"
          cursorColor={"#0F2355"}
          selectionHandleColor={"#0F2355"}
          selectionColor={"#BCBCBC"}
          onChangeText={onDescricaoChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Inicio do Evento</Text>
        <TextInput
          placeholder="Adicione a data inicio do evento"
          cursorColor={"#0F2355"}
          selectionHandleColor={"#0F2355"}
          selectionColor={"#BCBCBC"}
          onChangeText={onInicioChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Final do Evento</Text>
        <TextInput
          placeholder="Adicione a data final do evento"
          cursorColor={"#0F2355"}
          selectionHandleColor={"#0F2355"}
          selectionColor={"#BCBCBC"}
          onChangeText={onFinalChange}
        />
      </View>

      <View style={styles.line}></View>
    </>
  );
};

// validação do nome completo
const isNomeEventoValid = (nomeCompleto) => {
  const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return re.test(nomeCompleto);
};
// validação da data de inicio.
const isDataInicioValid = (dataInicio) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  // Verificação do formato da data
  if (!regex.test(dataInicio)) {
    Alert.alert("Erro", "Formato da data de início inválido. Ex: 05/06/2024");
    return false; // Formato inválido
  }

  const [_, dia, mes, ano] = dataInicio.match(regex);

  // Verificação do mês
  const mesInt = parseInt(mes, 10);
  if (mesInt < 1 || mesInt > 12) {
    Alert.alert("Erro", "Mês inválido.");
    return false; // Mês inválido
  }

  // Verificação do ano
  const anoInt = parseInt(ano, 10);
  if (anoInt < 1) {
    Alert.alert("Erro", "Ano inválido.");
    return false; // Ano inválido
  }

  // Verificação dos dias no mês
  const diaInt = parseInt(dia, 10);
  const diasNoMes = [
    31,
    (anoInt % 4 === 0 && anoInt % 100 !== 0) || anoInt % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (diaInt < 1 || diaInt > diasNoMes[mesInt - 1]) {
    Alert.alert("Erro", "Dia inválido para o mês.");
    return false; // Dia inválido
  }

  // Comparação da data do evento com a data atual
  const dataEvento = new Date(`${ano}-${mes}-${dia}`);
  const dataAtual = new Date();

  // Comparar apenas a data, sem a hora
  dataAtual.setHours(0, 0, 0, 0);

  if (dataEvento < dataAtual) {
    Alert.alert(
      "Erro",
      "A data de início é inválida! Não pode ser anterior à data atual."
    );
    return false; // Data do evento anterior à data atual
  }

  return true; // Data válida
};

// validação da data de termino.
const isDataFimValid = (dataFim, dataInicio) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!regex.test(dataFim)) {
    Alert.alert("Erro", "Formato da data de término inválido. Ex: 05/06/2024");
    return false; // Formato inválido
  }

  const [_, diaInicio, mesInicio, anoInicio] = dataInicio.match(regex);
  const dataEventoInicio = new Date(`${anoInicio}-${mesInicio}-${diaInicio}`);

  const [__, diaFim, mesFim, anoFim] = dataFim.match(regex);

  const mesFimInt = parseInt(mesFim, 10);
  if (mesFimInt < 1 || mesFimInt > 12) {
    Alert.alert("Erro", "Mês inválido.");
    return false; // Mês inválido
  }

  const anoFimInt = parseInt(anoFim, 10);
  if (anoFimInt < 1) {
    Alert.alert("Erro", "Ano inválido.");
    return false; // Ano inválido
  }

  const diaFimInt = parseInt(diaFim, 10);
  const diasNoMesFim = [
    31,
    (anoFimInt % 4 === 0 && anoFimInt % 100 !== 0) || anoFimInt % 400 === 0
      ? 29
      : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (diaFimInt < 1 || diaFimInt > diasNoMesFim[mesFimInt - 1]) {
    Alert.alert("Erro", "Dia inválido para o mês.");
    return false; // Dia inválido
  }

  const dataEventoFim = new Date(`${anoFim}-${mesFim}-${diaFim}`);

  if (dataEventoFim < dataEventoInicio) {
    Alert.alert(
      "Erro",
      "Data de término inválida! Não pode ser anterior à data de início."
    );
    return false; // Data de término anterior à data de início
  }

  return true; // Data válida
};

export const validarInputs = (nome, descricao, inicio, final) => {
  if (nome == "" || descricao == "" || inicio == "" || final == "") {
    Alert.alert("Erro", "Preencha todos os campos!");
    return false;
  } else {
    if (!isNomeEventoValid(nome)) {
      Alert.alert("Erro", "O nome deve conter apenas letras!");
      return false;
    } else {
      if (!isDataInicioValid(inicio)) {
        return false;
      } else {
        if (!isDataFimValid(final, inicio)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "80%",
    marginBottom: 2,
  },
  inputTitle: {
    fontWeight: "bold",
  },
  line: {
    height: 1,
    width: "90%",
    backgroundColor: "#7591D9",
    marginBottom: 10,
  },
});

export default EventoTextInputs;
