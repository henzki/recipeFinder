import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "95%",
          backgroundColor: "#CED0CE",
          marginTop: 5,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{flex: 1, marginLeft : "1%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 20}}>{item.strMeal}</Text>
            <Image style={{ width: 100, height: 100 }} source={{ uri: `${item.strMealThumb}`, }} />
          </View>}
        data={repositories} 
        ItemSeparatorComponent={listSeparator}
     /> 
     <View style={styles.input} style={{flex: 0.15, marginLeft : "1%"}}>
      <TextInput style={{ fontSize: 20}} textAlign={'center'} placeholder='Place an ingredient' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRepositories} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   justifyContent: 'center',
   marginTop: 25,
   marginBottom: 20
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 });