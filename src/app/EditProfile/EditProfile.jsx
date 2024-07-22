import { KeyboardAvoidingView
    , View
    , Text
    , StyleSheet
    ,Image
    ,TextInput
    ,TouchableOpacity
    ,Alert
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/self_perfil";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import { collection, addDoc, getDocs, where, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfigs";
import ProfileSelector from "../../Helpers/ProfileSelector";
import { uploadImage } from "../../Helpers/ImageUploader";

export default function EditProfile(){
    
    const [docID, setDocId] = useState("")

    const [id, setID] = useState("")
    const [tipo, setTipo] = useState("")
    const [nomeUsuario, setnomeUsuario] = useState("")
    const [nomeCompleto, setNomeCompleto] = useState("")
    const [dataInicio, setDataInicio] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    var imageChanged = false

    useEffect(() => {
        async function fetchUser(){
            const fetchedUser = await getUser();
            setDocId(fetchedUser[0].docID)
            setID(fetchedUser[0].id)
            setTipo(fetchedUser[0].tipoUsuario)
            setImageUrl(fetchedUser[0].imageUrl)
            if(tipo === "Pessoa"){
                setNomeCompleto(fetchedUser[0].nomeCompleto)
                setnomeUsuario(fetchedUser[0].nomeUsuario)
            }else{
                setNomeCompleto(fetchedUser[0].nomeCompleto)
                setDataInicio(fetchedUser[0].dataInicio)
            }
        }
        fetchUser();
    }, []);

    const isNomeCompletoValid = (nomeCompleto) => {
        const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        return re.test(nomeCompleto);
    };

    const isNomeCompletoDisponivel = async (nomeCompleto) => {
        if (isNomeCompletoValid(nomeCompleto)) {
          try {
            const q = query(
              collection(db, "usuarios"),
              where("nomeCompleto", "==", nomeCompleto),
              where("tipoUsuario", "==", "Instituição")
            );
    
            const querySnapshot = await getDocs(q);
            return querySnapshot.empty; // Retorna true se não houver documentos correspondentes (nome de usuário disponível)
          } catch (error) {
            console.error("Erro ao verificar nome de intituição: ", error);
            return false;
          }
        } else {
          return 1;
        }
    };

    const isNomeCompletoValido = async (nomeCompleto) => {
        // Verifica se o nome de usuário está vazio
        if (nomeCompleto.trim() === "") {
          return false;
        }
        // Verifica se o nome de usuário já está em uso
        const disponivel = await isNomeCompletoDisponivel(nomeCompleto);
        return disponivel;
    };

    const isDateValid = (date) => {
        const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
        if (!re.test(date)) return false;
        const [day, month, year] = date.split("/").map(Number);
        const dateObj = new Date(year, month - 1, day);
        return (
          dateObj.getFullYear() === year &&
          dateObj.getMonth() === month - 1 &&
          dateObj.getDate() === day
        );
    };

    const handleUpdate = async () => {
        dicUpdate = {}
        isValid = false
        if(tipo === "Pessoa"){
            isValid = await isNomeCompletoValido(nomeCompleto)
            dicUpdate = {
                nomeUsuario: nomeUsuario,
                nomeCompleto: nomeCompleto,
                imageUrl: imageChanged ? await uploadImage(
                    selectedImage,
                    `eventos/${Date.now()}_${id}.jpg`
                ) : imageUrl
            }
        }else if(tipo === "Instituição"){
            isValid = await isNomeCompletoValido(nomeCompleto) && isDateValid(dataInicio)
            dicUpdate = {
                nomeCompleto: nomeCompleto,
                dataInicio: dataInicio,
                imageUrl: imageChanged ? await uploadImage(
                    selectedImage,
                    `Perfis/${Date.now()}_${id}.jpg`
                ) : imageUrl
            }
        }

        console.log(dicUpdate)

        if (isValid) {
            await updateDoc(doc(db, "usuarios", docID),dicUpdate)
            router.back()
        } else {
            Alert.alert("Erro", "Erro ao atualizar usuario.");
        }
    };

    const handleImageSelected = (uri) => {
        setSelectedImage(uri);
        imageChanged = true
    };

    return(
        <KeyboardAvoidingView style={styles.container}>

            <ProfileSelector onImageSelected={handleImageSelected} />
            
            { (tipo === "Pessoa") ? (
                    <View style={styles.inputContainer}>
                        <Text style={styles.headerText}>Nome completo</Text>
                        <View style={styles.inputStyle}>
                            <MaterialIcons
                                name="badge"
                                size={24}
                                color="#0F2355"
                                style={styles.iconStyle}
                            />
                            <TextInput
                            // placeholder = "Nome Completo"
                            value= {nomeCompleto}
                            width = "100%"
                            autoCorrect = {false}
                            cursorColor={"#000000"}
                            selectionColor={"#000000"}
                            onChangeText={(text) => setNomeCompleto(text)}
                            />
                        </View>
                        <Text style={styles.headerText}>Nome de usuário</Text>
                        <View style={styles.inputStyle}>
                            <MaterialIcons
                                name="account-circle"
                                size={24}
                                color="#0F2355"
                                style={styles.iconStyle}
                            />
                            <TextInput
                                // placeholder = "Nome de Usuário"
                                value= {nomeUsuario}
                                width = "100%"
                                autoCorrect = {false}
                                cursorColor={"#000000"}
                                selectionColor={"#000000"}
                                onChangeText={(text) => setnomeUsuario(text)}
                            />
                        </View>
                    </View>
                ) :
                (
                    <View style={styles.inputContainer}>
                        <Text style={styles.headerText}>Nome da instituição</Text>
                        <View style={styles.inputStyle}>
                            <MaterialIcons
                                name="badge"
                                size={24}
                                color="#0F2355"
                                style={styles.iconStyle}
                            />
                            <TextInput
                            // placeholder = "Nome da Instituição"
                                value= {nomeCompleto}
                                width = "100%"
                                autoCorrect = {false}
                                cursorColor={"#0F2355"}
                                selectionHandleColor={"#0F2355"}
                                selectionColor={"#BCBCBC"}
                                onChangeText={(text) => setNomeCompleto(text)}
                            />
                        </View>
                    
                        
                        <Text style={styles.headerText}>Data de inicio das atividades</Text>
                        <View style={styles.inputStyle}>
                            <MaterialIcons
                                name="calendar-month"
                                size={24}
                                color="#0F2355"
                                style={styles.iconStyle}
                            />
                            <TextInput
                                // placeholder="Data de início das atividades"
                                value= {dataInicio}
                                width="100%"
                                cursorColor={"#0F2355"}
                                selectionHandleColor={"#0F2355"}
                                selectionColor={"#BCBCBC"}
                                onChangeText={(texto) => setDataInicio(texto)}
                            />
                        </View>
                    </View>
                )
            }
            <TouchableOpacity onPress={handleUpdate}>
                <View style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Atualizar Dados</Text>
                </View>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "top",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 35,
    },
    
    headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0F2355",
    },

    backIcon: {
    left: 6,
    position: "absolute",
    },

    inputContainer: {
        marginTop: 15,
        // alignItems: "center",
    },

    iconStyle: {
        marginLeft: 10,
        marginRight: 10,
    },

    inputTitleContainer: {
        width: "90%",
    },

    inputTitleText: {
    color: "#0F2355",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
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

    submitBtn: {
        backgroundColor: "#0F2355",
        borderRadius: 25,
        padding: 10,
        paddingLeft: 35,
        paddingRight: 35,
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },

    submitBtnText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
})