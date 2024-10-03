import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { TMDB_ACCESS_TOKEN } from '../../config/apiConfig';
import { Picker } from '@react-native-picker/picker';  
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [query, setQuery] = useState(''); 
  const [searchType, setSearchType] = useState('movie'); 
  const [results, setResults] = useState([]);
  const [error, setError] = useState(''); 
  const navigation = useNavigation();

  // Function to perform search based on query and type
  const searchMedia = async () => {
    if (!query) {
      setError('Movie/TV show name is required');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}?query=${query}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setResults(response.data.results);
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}  
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.itemTitle}>{item.title || item.name}</Text>
        <Text>Popularity: {item.popularity}</Text>
        <Text>Release Date: {item.release_date || item.first_air_date}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('MovieDetail', { movieId: item.id, mediaType: searchType })}
        >
          <Text style={styles.detailsButtonText}>
            More Details <Icon name="info-circle" size={16} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name*</Text>
      <View style={styles.inputContainer}>
        <Icon name="search" size={16} color="gray" style={styles.searchIcon} />
        <TextInput
          style={[styles.input, error ? styles.errorBorder : null]}
          placeholder="i.e. James Bond, CSI"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <Text style={styles.label}>Choose Search Type*</Text>
      <Picker
        selectedValue={searchType}
        style={[styles.picker, error ? styles.errorBorder : null]}
        onValueChange={(itemValue) => setSearchType(itemValue)}
      >
        <Picker.Item label="Movie" value="movie" />
        <Picker.Item label="Multi" value="multi" />
        <Picker.Item label="TV" value="tv" />
      </Picker>

      <TouchableOpacity style={styles.searchButton} onPress={searchMedia}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {results.length === 0 && <Text style={styles.initiateSearchText}>Please initiate a search</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#0f4067',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  initiateSearchText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 30,
  },
  resultsList: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsButton: {
    backgroundColor: '#9edbe7',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  detailsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorBorder: {
    borderColor: 'red',
  },
});
