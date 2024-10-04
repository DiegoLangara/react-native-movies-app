import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import Icon from 'react-native-vector-icons/FontAwesome';  
import CardComponent from '../layout/CardComponent';
import { searchMedia } from '../../services/HelperFunctions';

export default function SearchScreen() {
  const [query, setQuery] = useState(''); 
  const [searchType, setSearchType] = useState('movie'); 
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  


  const handleInputChange = (text) => {
    setQuery(text);
    if (!text) {
      setResults([]); 
    }
  };


  const handleSearchTypeChange = (itemValue) => {
    setSearchType(itemValue);
    setResults([]); 
  };

  const renderItem = ({ item }) => <CardComponent item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Search Movie/TV Show Name <Text style={styles.required}>*</Text>
      </Text>
      <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
        <Icon name="search" size={25} color="lightgray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="i.e. James Bond, CSI"
          value={query}
          onChangeText={handleInputChange}
        />
      </View>

      <Text style={styles.label}>
        Choose Search Type <Text style={styles.required}>*</Text>
      </Text>

     
      <View style={styles.pickerButtonRow}>
        <View style={[styles.pickerContainer, error ? styles.errorBorder : null]}>
          <Picker
            selectedValue={searchType}
            style={styles.picker}
            onValueChange={handleSearchTypeChange}
          >
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Multi" value="multi" />
            <Picker.Item label="TV" value="tv" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.searchButton}  onPress={() => searchMedia(searchType, query, setResults, setError)}>
          <Text style={styles.searchButtonText}>
            <Icon name="search" size={16} color="#fff" style={styles.searchIcon} /> Search
          </Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {results.length === 0 && (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={styles.initiateSearchText}>Please initiate a search</Text>
        </ScrollView>
      )}

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
  required: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  
  pickerButtonRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',  
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',  
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,  
  },
  picker: {
    height: 40,  
    marginVertical: -4,  
  },
  searchButton: {
    backgroundColor: '#1c94bc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,  
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
    fontSize: 30,
    color: 'gray',
    fontWeight: 'bold',
  },
  resultsList: {
    marginTop: 20,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
