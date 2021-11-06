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
     /> 
     <View style={styles.input} style={{flex: 0.2, marginLeft : "1%"}}>
      <TextInput style={{ fontSize: 20, width: 350}} textAlign={'center'} placeholder='keyword' 
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
  },
  input: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
 });