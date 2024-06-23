// tela principal do aplicativo
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { useState, useRef } from "react";
import { getIntituicoes, getEventos } from "../../utils/search";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const QueryResult = ({item, remove}) => {

  return (
    <View style={styles.queryContainer}>
      {item.type === 'I' && <Ionicons name="person-circle" size={60} color="#7591D9" style={{marginRight: 5}}/>}
      {item.type === 'E' && <Image source={{ uri: item.image }} style={{height: 50, width: 50, borderRadius: 50, marginRight: 10}}/>}
      
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
  )
}

export default function search() {
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timeout = useRef(null)

  function removeFromList(id){
    const filtered = queryResult.filter((doc) => doc.id !== id)
    setQueryResult(filtered)
  }

  async function searchAll(query){   
    console.log(query)
    
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
            timeout.current = setTimeout(() => searchAll(query), 1000)
          }}
        />
      </View>
      
      {isLoading && <ActivityIndicator size="large" color="#7591D9" style={{marginTop: 25, marginBottom: 25}}/>}
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={queryResult}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <QueryResult item={item} remove={removeFromList}/>}
        />
      </TouchableWithoutFeedback>
      
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
  }
});
