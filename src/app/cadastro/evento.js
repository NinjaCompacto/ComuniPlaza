// tela principal do aplicativo
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function publicacao() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Grupo 1', value: 1},
    {label: 'Grupo 2', value: 2},
    {label: 'Grupo 3', value: 3},
    {label: 'Grupo 4', value: 4},
    {label: 'Grupo 5', value: 5},
    {label: 'Grupo 6', value: 6},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Icone de retorno no topo da tela */}
      <View>
        <Ionicons style={styles.backIcon} name="chevron-back-circle" size={45} color="#1E2E57"/>
      </View>

      {/* Icone de add imagem */}
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <MaterialIcons name="add-photo-alternate" size={225} color="#1E2E57"/>
        </TouchableOpacity>
      </View>

      {/* inputs de dados do evento */}
      <View style={styles.inputContainer}>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Nome do Evento</Text>
          <TextInput
            placeholder="Adicione o nome do evento"
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Descrição</Text>
          <TextInput
            placeholder="Adicione a descrição do evento"
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Inicio do Evento</Text>
          <TextInput
            placeholder="Adicione a data inicio do evento"
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Final do Evento</Text>
          <TextInput
            placeholder="Adicione a data final do evento"
          />
        </View>

        <View style={styles.line}></View>

        <View style={styles.inputStyle}>
          <Text style={styles.inputTitle}>Grupos beneficiados</Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            multiple={true}
            maxHeight={200}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            mode="BADGE"
            placeholder="Nenhum"
            dropDownDirection="TOP"
            style={styles.selectInputStyle}
            listItemContainerStyle={{backgroundColor: "#1E2E57"}}
            listItemLabelStyle={{color:"#FFF"}}
            placeholderStyle={{color: '#FFF'}}
            ArrowDownIconComponent={({style}) => <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFF"/>}
            ArrowUpIconComponent={({style}) => <MaterialIcons name="keyboard-arrow-up" size={24} color="#FFF" />}
            TickIconComponent={({style}) => <MaterialIcons name="check" size={24} color="#FFF" />}
          /> 
        </View>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Compartilhar</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F7",
    height: "100%",
  },

  backIcon: {
    marginLeft: 10,
    marginTop: 8
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputStyle: {
    width: '80%',
  },

  inputTitle: {
    fontWeight: 'bold'
  },

  line: {
    height: 1,
    width: "90%",
    backgroundColor: '#7591D9'
  },

  submitBtn: {
    backgroundColor: "#1E2E57",
    borderRadius: 25,
    padding: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },

  submitBtnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold'
  },

  selectInputStyle: {
    backgroundColor: "#1E2E57",
    borderRadius: 20,
    color: "#FFF",
    marginTop: 5,
    minHeight: 25,
  },
});
