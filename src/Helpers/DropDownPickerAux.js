// esse arquivo é responsavel por listar os grupos

import React, { useEffect, useState } from "react";
import { 
  StyleSheet
} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';


const DropDownPickerAux = ({onGrupoSelected, valuesList}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(valuesList);

  useEffect( () => {
      if(onGrupoSelected){
        onGrupoSelected(value, items);
      }
    }
  );

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
    marginBottom: 7,
    minHeight: 25,
  },
});

export default DropDownPickerAux;