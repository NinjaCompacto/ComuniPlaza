// esse arquivo é responsavel por listar os grupos

import React, { useState } from "react";
import { 
  StyleSheet
} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';


const DropDownPickerAux = () => {
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
  );
};

const styles = StyleSheet.create({
  selectInputStyle: {
    backgroundColor: "#1E2E57",
    borderRadius: 20,
    color: "#FFF",
    marginTop: 5,
    minHeight: 25,
  },
});

export default DropDownPickerAux;