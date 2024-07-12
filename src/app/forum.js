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
import { router } from "expo-router";

const CommentView = ({text}) => {
    return (
        <View style={{flexDirection: "row", marginBottom: 15}}>
            <Ionicons name="person-circle" size={50} color="#7591D9"/>
            <View style={styles.commentSection}>
                <Text style={{marginLeft: 5, marginTop: 2}}>{text}</Text>
            </View>
        </View>
    )
}

export default function forum() {
    const data = []

    for(let i = 0; i < 20; i++) data.push(`comentário ${i+1}`)

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
                <Text style={styles.title}>Fórum do Evento Beneficente A</Text>
                <Text style={{ color: "#FFF" }}>Fórum de avisos - {56} membros</Text>
            </View>

            <FlatList
                data={data.reverse()}
                keyExtractor={(item) => item.index}
                renderItem={({item}) => <CommentView text={item}/>}
                inverted
                style={{maxHeight: "70%"}}
            />

            <View style={styles.footer}>
                <TextInput
                    placeholder="Digite uma mensagem"
                    style={styles.textInput}
                    maxLength={50}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons name="send-circle" size={50} color="#0F2355"/>
                </TouchableOpacity>               
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#BBC9EC",
        // justifyContent: 'center',
        //alignItems: 'center'
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
        fontWeight: "bold"
    },

    footer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    textInput: {
        backgroundColor: "#FFF",
        width: "70%",
        borderRadius: 30,
        padding: 10
    },

    commentSection: {
        backgroundColor: "#FFF",
        height: "100%",
        width: "80%",
        marginTop: 15,
        marginLeft: 5,
    }
})