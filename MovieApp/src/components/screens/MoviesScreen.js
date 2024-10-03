import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { TMDB_ACCESS_TOKEN } from '../../config/apiConfig';
import { Picker } from '@react-native-picker/picker';  
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('now_playing');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  // To store total pages
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchMovies();
  }, [category, page]);

  // Fetch movies with pagination and Bearer token authentication
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`, 
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);  // Set total pages from the API response
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}  // Movie image
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>Popularity: {item.popularity}</Text>
        <Text>Release Date: {item.release_date}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('MovieDetail', { movieId: item.id, mediaType: 'movie' })}
        >
          <Text style={styles.detailsButtonText}>More Details   <Icon name="plus-square" size={13} color="#fff" /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     
      {/* Dropdown for category selection */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Now Playing" value="now_playing" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="top_rated" />
        <Picker.Item label="Upcoming" value="upcoming" />
      </Picker>

      {/* Movie list */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {page > 1 && (
          <TouchableOpacity style={styles.paginationButtonLeft} onPress={() => setPage(page - 1)}>
            <Text style={styles.paginationButtonText}><Icon name="chevron-left" size={13} color="#fff" />  Prev</Text>
          </TouchableOpacity>
        )}
        
        {/* Page number display */}
        <View style={styles.pageInfo}>
        
          <Text style={styles.pageInfoText}>{page} of {totalPages}</Text>
        </View>
        
        {page < totalPages && (
          <TouchableOpacity style={styles.paginationButtonRight} onPress={() => setPage(page + 1)}>
            <Text style={styles.paginationButtonText}>Next   <Icon name="chevron-right" size={13} color="#fff" /></Text>
            
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  picker: {
    height: 30,
    width: 200,
    alignSelf: 'center',
    marginBottom: 5,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,  // For shadow on Android
    shadowColor: '#000',  // For shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  paginationButtonLeft: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: '#1c94bc',
    padding: 10,
    borderRadius: 8,
  },
  paginationButtonRight: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#1c94bc',
    padding: 10,
    borderRadius: 8,
  },
  paginationButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pageInfo: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pageInfoText: {
    fontSize: 16,
    color: '#0f4067',
    textAlign: 'center',
    paddingBottom: 10,
  },
});
