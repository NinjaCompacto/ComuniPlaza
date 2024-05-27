import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { Link, router } from "expo-router";

// firebase imports
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from 'firebase/auth'
import {collection , addDoc, getDocs, where, query } from 'firebase/firestore';
import { auth, db } from './../../configs/firebaseConfigs'

export default function instituicao() {
  //dados para cadastro
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [CNPJ, setCNPJ] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [email, setEmail] = useState("");

    //Visibilite da senha
    const [hidePass, setHidePass] = useState(true);
    const [hideConfirmPass, setHideConfirmPass] = useState(true);

   // validação da senha
   const isPasswordValid = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return re.test(password);
  }
  // validação do nome completo
  const isNomeCompletoValid = (nomeCompleto) => {
    const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return re.test(nomeCompleto);
  }
  // validação da confirmação de senha
  const isConfirmPassword = (confirmPassword) => {
    return password === confirmPassword;
  }
  // validação de email
  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  // validação de formato de data
  const isDateValid = (date) => {
    const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    if (!re.test(date)) return false;
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
  };
  // validação do CNPJ
  function isCNPJValid (CNPJ) {
    // Verifica se o CNPJ tem 14 dígitos e contém apenas números
    const regex = /^\d{14}$/;
    return regex.test(CNPJ);
    return true
  }

  // Função para verificar se o nome de usuário já está em uso
  // retorno 1 (CNPJ invalido) , retorno false (CNPJ já em uso), retorno true (tudo certo !)
  const isCNPJDisponivel = async (CNPJ) => {

    if ( isCNPJValid(CNPJ) ){
      try {
        const q = query(collection(db, 'usuarios'), 
        where('CNPJ', '==', CNPJ),
        where('tipoUsuario', '==' , "Instituição"));

        const querySnapshot = await getDocs(q);
        return querySnapshot.empty; // Retorna true se não houver documentos correspondentes (nome de usuário disponível)
      } catch (error) {
        console.error('Erro ao verificar CNPJ de usuário: ', error);
        return false;
      }
    }
    else{return 1}
    
  };
  // Função de validação do nome de usuário
  const isCNPJValido = async (CNPJ) => {
    // Verifica se o nome de usuário está vazio
    if (CNPJ.trim() === '') {
      return false;
    }
    // Verifica se o nome de usuário já está em uso
    const disponivel = await isCNPJDisponivel(CNPJ);
    return disponivel;
  };

  // validação de infromações para cadastro
  const validacaoInfos = async  (nomeCompleto, CNPJ, password,confirmPassword, dataInicio,email) => {
    if (nomeCompleto === "" || CNPJ === "" || password === "" || confirmPassword === "" || dataInicio === "" ||
     email === "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      return false;
    }else {
      if(!isNomeCompletoValid(nomeCompleto)){
        Alert.alert("Erro", "O campo nome deve conter apenas letras.")
        return false;
      }else{
        if(!isPasswordValid(password)){
          Alert.alert("Erro", "Sua senha deve ter no mínimo 6 caracteres, conter pelo menos um número e pelo menos um caractere especial.")
          return false;
        }else{
          if(!isConfirmPassword(confirmPassword)){
            Alert.alert("Erro", "As senhas não coincidem.")
            return false;
          }else{
            if (!isDateValid(dataInicio)){
              Alert.alert("Erro", "Data inválida.")
              return false;
            }
            else{
              if(!isEmailValid(email)){
                Alert.alert("Erro", "Email inválido.")
                return false;
              }
              else{
                const CNPJValido = await isCNPJValido(CNPJ);
                if(CNPJValido === 1){
                  Alert.alert("Erro", "CNPJ invalido.")
                  return false;
                }
                else if (!CNPJValido ){
                  Alert.alert("Erro", " O CNPJ já estar em uso.")
                }
                else{
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }

  // Função para adicionar os detalhes do usuário no Firestore
  const adicionarDetalhesUsuario = async (uid, email ,nomeCompleto, CNPJ, dataInicio) => {
    try {
      // Adiciona um novo documento na coleção 'usuarios' com os detalhes do usuário
      const docRef = await addDoc(collection(db, 'usuarios'), {
        uid: uid,
        email: email,
        nomeCompleto: nomeCompleto,
        CNPJ: CNPJ,
        dataInicio: dataInicio,
        tipoUsuario: "Instituição",
        // Você pode adicionar outros campos conforme necessário
      });
      console.log('Documento adicionado com ID: ', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
    }
  };

  //Cadastro de usuario
  const handleCadastro = async () => {
    
    const isValid = await validacaoInfos(
      nomeCompleto,
      CNPJ,
      password,
      confirmPassword,
      dataInicio,
      email
    );

    if (isValid){
      createUserWithEmailAndPassword(auth , email, password)
       .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        adicionarDetalhesUsuario(user.uid, email ,nomeCompleto, CNPJ, dataInicio);
        Alert.alert("Sucesso", "Sucesso ao cadastrar instituição");
        router.navigate("./../login"); // volta para tela de login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        
        // tratamento de erros pelo firebase
        if (errorCode === 'auth/email-already-in-use') {
          Alert.alert("Erro", "Este email já está cadastrado.");
        } else if (errorCode === 'auth/invalid-email') {
          Alert.alert("Erro", "Email inválido.");
        } else if (errorCode === 'auth/weak-password') {
          Alert.alert("Erro", "Sua senha deve ter no mínimo 6 caracteres, conter pelo menos um número e pelo menos um caractere especial.");
        } else {
          Alert.alert("Erro", "Erro ao cadastrar usuario.");
        }
        console.log(error);

      });
    }
  }
    

  return (
    <>
      {/* header com o título da página */}
      <Appbar.Header statusBarHeight={0} style={styles.header}>
        <TouchableOpacity>
          <Link href={"./identificacao"}>
            <MaterialIcons name="chevron-left" color="#FFF" size={35} />
          </Link>
        </TouchableOpacity>
        <Appbar.Content title="Cadastro de Instituição" color="#fff" />
      </Appbar.Header>

      {/* inputs do cadastro */}
      <View style={styles.inputContainer}>
        <View style={styles.inputTitleContainer}>
          <Text style={styles.inputTitleText}>Informe os dados solicitados</Text>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="badge"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Nome da instituição"
            placeholderTextColor="#0F2355"
            width="100%"
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setNomeCompleto(texto)}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="person"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="CNPJ"
            inputMode="numeric"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setCNPJ(texto)}
          ></TextInput>
        </View>

        <View style={styles.passArea}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            style={styles.pass}
            placeholder="Senha"
            value={password}
            secureTextEntry={hidePass} //aplica a mascara da senha
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setPassword(texto)} 
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePass(!hidePass)} //quando clica muda o status de visualização
          >
            <Ionicons
              name={hidePass ? "eye" : "eye-off"}
              color="#0F2355"
              size={25}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passArea}>
          <MaterialIcons
            name="lock"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            style={styles.pass}
            placeholder="Confirmar senha"
            value={confirmPassword}
            secureTextEntry={hideConfirmPass} //aplica a mascara da senha
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setConfirmPassword(texto)}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHideConfirmPass(!hideConfirmPass)} //quando clica muda o status de visualização
          >
            <Ionicons
              name={hideConfirmPass ? "eye" : "eye-off"}
              color="#0F2355"
              size={25}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="calendar-month"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="Data de início das atividades"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setDataInicio(texto)}
          ></TextInput>
        </View>

        <View style={styles.inputStyle}>
          <MaterialIcons
            name="email"
            size={24}
            color="#0F2355"
            style={styles.iconStyle}
          />

          <TextInput
            placeholder="E-mail"
            inputMode="email"
            placeholderTextColor="#0F2355"
            cursorColor={"#0F2355"}
            width="100%"
            selectionHandleColor={"#0F2355"}
            selectionColor={"#BCBCBC"}
            onChangeText={(texto) => setEmail(texto)}
          ></TextInput>
        </View>

          <TouchableOpacity style={styles.btnCadastro} onPress={handleCadastro}>
            <View style={styles.btnSubmit}>
              <Text style={styles.submitText}>Cadastrar</Text>
            </View>
          </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#0F2355",
    // flexDirection: 'row',
    justifyContent: "left",
  },

  //area da senha
  passArea: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#0F2355",
    borderWidth: 1,
    borderStyle: "solid",
    margin: 5,
    //backgroundColor: "blue",
  },

  //texto da senha
  pass: {
    width: "73%",
    height: 50,
    color: "#0F2355",
    padding: 4,
    fontSize: 15,
  },

  //olho da senha
  icon: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },

  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "green",
  },

  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
  },

  inputTitleContainer: {
    width: "90%"
  },

  inputTitleText: {
    color: "#0F2355",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8
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
    margin: 5,
    padding: 4,
    fontSize: 15,
  },

  submitText: {
    color: "#FFF",
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },

  btnCadastro: {
    backgroundColor: "#0F2355",
    width: "50%",
    height: 45,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
});
