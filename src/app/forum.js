import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    TextInput
} from "react-native";

import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalSearchParams, router } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { getForumByEventID, getForumRef, setForumAttribute } from "../utils/forum";
import { getUser } from "../utils/gets";
import { userID } from "./(tabs)";
import { onSnapshot } from "firebase/firestore";

const CommentView = ({text, idUser}) => {
    const [name, setName] = useState("???")
    const [isYou, setIsYou] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        async function fetchData(){
            const user = await getUser(idUser)
            const name = user.tipoUsuario === "Pessoa" ?  user.nomeUsuario : user.nomeCompleto 
            setName(name)
            setIsYou(user.uid === userID)
            setImageUrl(user.imageUrl ?? null)
        }

        fetchData()
    }, [])

    return (
        <View style={{marginBottom: 15, flexDirection: isYou ? "row-reverse" : "row", marginRight: 10}}>
            {!isYou && 
            <>
            {imageUrl
              ?
              <Image source={{ uri: imageUrl }} style={{height: 30, width: 30, borderRadius: 100, marginRight: 2, marginLeft: 2}}/>
              : 
              <Ionicons name="person-circle" size={30} color="#7591D9" />
            }
            </>
            }
            <View style={styles.commentSection}>
                {!isYou && <Text style={styles.commentTitle}>{name}</Text>}
                <Text style={{marginLeft: 5, marginTop: 2}}>{text}</Text>
            </View>
        </View>
    )
}

export default function forum() {
    const textInputRef = useRef(null);
    const [forum, setForum] = useState(null)
    const [comment, setComment] = useState("")
    const {idEvento, title} = useGlobalSearchParams()
    
    useEffect(() => {
        async function fetchData(){
            const fetchedForum = await getForumByEventID(idEvento)
            setForum(fetchedForum)

            const ref = getForumRef(fetchedForum.doc_id)
            onSnapshot(ref, async () => {
                const fetchedForum = await getForumByEventID(idEvento)
                setForum(fetchedForum)
            })
        }

        fetchData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons
                    name="chevron-left"
                    size={45}
                    color="#FFF"
                    style={styles.backIcon}
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>Fórum do Evento {title}</Text>
               {forum !== null && <Text style={{ color: "#FFF" }}>
                    Fórum de avisos - {forum.participantes.length} membros
                </Text>}
            </View>
            
           {forum !== null && <FlatList
                data={forum.mensagens.toReversed()}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <CommentView text={item.comment} idUser={item.userId}/>}
                inverted
                style={{maxHeight: "70%"}}
            />}

            <View style={styles.footer}>
                <TextInput
                    placeholder="Digite uma mensagem"
                    value={comment}
                    style={styles.textInput}
                    maxLength={150}
                    onChangeText={(text) => setComment(text)}
                    ref={textInputRef}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons 
                    name="send-circle" 
                    size={50} 
                    color="#0F2355"
                    onPress={async () => {
                        if(comment !== ""){
                            const mensagens = forum.mensagens
                            mensagens.push({id: Date.now(), userId: userID, comment: comment})
                            
                            setComment("")
                            if(textInputRef.current){
                                textInputRef.current.blur();
                            }

                            await setForumAttribute(forum.doc_id, "mensagens", mensagens)
                            setForum(await getForumByEventID(idEvento))
                        }
                     }}
                    />
                </TouchableOpacity>               
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    backIcon: {
        left: 6,
        position: "absolute",
    },

    header: {
        width: "100%",
        height: "10%",
        backgroundColor: "#0F2355",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },

    title: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        width: "70%",
        maxHeight: "60%",
        textAlign: "center"
    },

    footer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF",
    },

    textInput: {
        backgroundColor: "#D3D3D3",
        width: "70%",
        borderRadius: 30,
        padding: 10
    },
 
    commentSection: {
        backgroundColor: "#D3D3D3",
        height: "100%",
        width: "80%",
        marginTop:5,
        marginLeft: 5,
        borderRadius: 10,
        padding: 2
    },

    commentTitle: {
        fontWeight: "bold",
        color: "#1E2E57",
        marginLeft: 5
    },
})