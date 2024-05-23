import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { Link } from "expo-router";

export default function cadastroUsuario(){
    const [hidePass, setHidePass] = useState(true);

    return (<>
            {/* header com o título da página */}
            <Appbar.Header statusBarHeight={0} style={styles.header}>
                <MaterialIcons name="arrow-back-ios" size={24} color="white" style={styles.iconStyle}/>
                <Appbar.Content title="Cadastro Instituição" color="#fff" />
            </Appbar.Header>

            
            {/* inputs do cadastro */}
            <View style={styles.inputContainer}>

                <View>
                    <Text style={styles.inputTitle}>Informe os dados solicitados</Text>
                </View>
            
                
                <View style={styles.inputStyle}>
                    <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="Nome da instituição"
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>

                <View style={styles.inputStyle}>
                    <MaterialIcons name="person" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="CNPJ"
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>

                <View style={styles.inputStyle}>
                    <MaterialIcons name="lock" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>

                <View style={styles.inputStyle}>
                    <MaterialIcons name="lock" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="Repita a senha"
                        secureTextEntry={true}
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>

                <View style={styles.inputStyle}>
                    <MaterialIcons name="calendar-month" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="Data início das atividades"
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>

                <View style={styles.inputStyle}>
                    <MaterialIcons name="email" size={24} color="black" style={styles.iconStyle}/>

                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#000"
                    ></TextInput>

                </View>
            </View>

            
            <View style={styles.footer}>
                <MaterialIcons name="arrow-forward-ios" size={60} color="black" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        backgroundColor: '#080F20',
        // flexDirection: 'row',
        // justifyContent: 'center'
    },

    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconStyle: {
        marginLeft: 10,
        marginRight: 10
    },

    inputTitle: {
        color: '#000',
        fontSize: 20,
    },

    inputStyle: {
        flexDirection: "row",
        width: "90%",
        height: 50,
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#0F2355",
        borderWidth: 1,
        borderStyle: "solid",
        margin: 5
      },

      footer: {
        alignItems: 'flex-end',
        marginBottom: 10,
        right: 0
      }
})