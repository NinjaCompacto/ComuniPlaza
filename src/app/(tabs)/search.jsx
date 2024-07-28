// tela principal do aplicativo
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { getIntituicoes, getEventos } from "../../utils/search";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from "expo-router";

const QueryResult = ({item, remove}) => {
  const router =  useRouter();

  const path = item.type === "I" ? '../profile2' : '../evento'
 
  return (
    <TouchableOpacity onPress={() => router.push({ pathname: path, params: { item: JSON.stringify(item.data) } })}>
      <View style={styles.queryContainer}>
        {item.type === 'I' &&  
        <>
          {item.data.imageUrl 
            ?
            <Image source={{ uri: item.data.imageUrl }} style={{height: 50, width: 50, borderRadius: 100, marginRight: 10, marginLeft: 2}}/>
            : 
            <Ionicons name="person-circle" size={60} color="#7591D9" />
          }
        </>}
        {item.type === 'E' && <Image source={{ uri: item.image }} style={{height: 50, width: 50, borderRadius: 50, marginRight: 10}} />}
        
        <View>
          <Text style={{fontSize: 15}}>{item.title}</Text>
          {item.type === 'I' && <Text style={{color: "#0F2355", fontSize: 12, fontWeight: 'bold'}}>Instituição</Text>}
          {item.type === 'E' && <Text style={{color: "#0F2355", fontSize: 12, fontWeight: 'bold'}}>Evento</Text>}
        </View>
  
        <Ionicons 
          name="close-sharp" 
          size={20} color="black" 
          style={{position: 'absolute', right: 10, padding: 10}}
          onPress={() => remove(item.id)}
        />
      </View>
    </TouchableOpacity>
  )
}

export default function search() {
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resultEmpty, setResultEmpty] = useState(null)
  const timeout = useRef(null)

  useEffect(() => {
    if(queryResult.length > 0) setResultEmpty(false)
    else if(query === "") setResultEmpty(false)
    else if(queryResult.length === 0) setResultEmpty(true)

  }, [queryResult])

  function removeFromList(id){
    const filtered = queryResult.filter((doc) => doc.id !== id)
    setQueryResult(filtered)
  }

  async function searchAll(query){   
    
    if(query !== ''){
      const eventos = await getEventos(query)
      const instituicoes = await getIntituicoes(query)

      setQueryResult([...eventos, ...instituicoes])   
    }
    else if(query === ''){
      setQueryResult([])
    }

    setIsLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={25} color="black" style={styles.searchIcon}/>

        <TextInput
          placeholder="Pesquisar"
          style={styles.searchInput}
          onChangeText={(query) => setQuery(query.trim().toLowerCase())}
          onKeyPress={() => {
            clearTimeout(timeout.current)
            setIsLoading(true)
            setResultEmpty(false)
            timeout.current = setTimeout(() => searchAll(query), 1000)
          }}
        />
      </View>
      
      {isLoading && <ActivityIndicator size="large" color="#7591D9" style={{marginTop: 25, marginBottom: 25}}/>}
      
      {!resultEmpty && 
      <TouchableWithoutFeedback 
          onPress={Keyboard.dismiss}>
        <FlatList
          data={queryResult}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <QueryResult item={item} remove={removeFromList}/>}
        />
      </TouchableWithoutFeedback>}

      {resultEmpty && 
      <View style={{alignItems: "center", marginTop: 25}}>
        <MaterialIcons name="search-off" size={110} color="#a9a9a9"/>
        <Text style={styles.noResultText}>Nenhum resultado encontrado</Text>
      </View>}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7591D9',
    marginTop: 50,
    marginBottom: 15,
    borderRadius: 15,
    width: '90%',
  },

  searchIcon: {
    marginLeft: 7
  },

  searchInput: {
    padding: 5,
    width: '100%'
  },

  queryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    width: 320,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#D1DEFF',
  },

  noResultText: {
    color: "#a9a9a9",
    fontSize: 16,
    fontWeight: "bold",
  },
});
