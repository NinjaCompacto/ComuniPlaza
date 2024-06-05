import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';

const EventoTextInputs = ({ 
  onNomeChange, 
  onDescricaoChange, 
  onInicioChange, 
  onFinalChange 
}) => {
  return (
    <View>
      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Nome do Evento</Text>
        <TextInput
          placeholder="Adicione o nome do evento"
          onChangeText={onNomeChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Descrição</Text>
        <TextInput
          placeholder="Adicione a descrição do evento"
          onChangeText={onDescricaoChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Inicio do Evento</Text>
        <TextInput
          placeholder="Adicione a data inicio do evento"
          onChangeText={onInicioChange}
        />
      </View>

      <View style={styles.line}></View>

      <View style={styles.inputStyle}>
        <Text style={styles.inputTitle}>Final do Evento</Text>
        <TextInput
          placeholder="Adicione a data final do evento"
          onChangeText={onFinalChange}
        />
      </View>
    </View>
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
  
    if (!regex.test(dataInicio)) {
        Alert.alert("Erro", "Formato da data de inicio invalida. Ex:05/06/2024")
        return false; // Formato inválido
    }
  
    const [_, dia, mes, ano] = dataInicio.match(regex);
    const dataEvento = new Date(`${ano}-${mes}-${dia}`);
    const dataAtual = new Date();
    
    // Comparar apenas a data, sem a hora
    dataAtual.setHours(0, 0, 0, 0);
    
    if (dataEvento < dataAtual) {
        Alert.alert("Erro", "A data de inicio invalida !")
        return false; // Data do evento anterior à data atual
    }
  
    return true; // Data válida
  };
// validação da data de termino.
const isDataFimValid = (dataFim, dataInicio) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      
    if (!regex.test(dataFim)) {
        Alert.alert("Erro", "Formato da data de fim invalida. Ex:05/06/2024")
        return false; // Formato inválido
    }

    const [__, diaInicio, mesInicio, anoInicio] = dataInicio.match(regex);
    const dataEventoInicio = new Date(`${anoInicio}-${mesInicio}-${diaInicio}`);

    const [___, diaFim, mesFim, anoFim] = dataFim.match(regex);
    const dataEventoFim = new Date(`${anoFim}-${mesFim}-${diaFim}`);

    if (dataEventoFim < dataEventoInicio){
        Alert.alert("Erro", "Data de termino invalida !");
        return false;
    }

    return true;
};


export const validarInputs = (nome, descricao, inicio, final) => {
    if (nome == "" || descricao == "" || inicio == "" || final == "") {
        Alert.alert("Erro", "Preencha todos os campos!");
        return false;
    }
    else{
        if(!isNomeEventoValid(nome)){
            Alert.alert("Erro", "O nome deve conter apenas letras!");
            return false;
        }
        else{
            if(!isDataInicioValid(inicio)){
                return false;
            }
            else{
                if(!isDataFimValid(final,inicio)){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
  }
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '80%',
    marginBottom: 10,
  },
  inputTitle: {
    fontWeight: 'bold',
  },
  line: {
    height:1,
    width: "90%",
    backgroundColor: '#7591D9',
    marginBottom: 10,
  },
});

export default EventoTextInputs;
