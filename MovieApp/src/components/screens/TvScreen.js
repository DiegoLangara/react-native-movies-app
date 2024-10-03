import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { TMDB_ACCESS_TOKEN } from '../../config/apiConfig';
import { Picker } from '@react-native-picker/picker';  
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons

export default function TvScreen() {
  const [tvShows, setTvShows] = useState([]);
  const [category, setCategory] = useState('airing_today');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchTvShows();
  }, [category, page]);

  // Fetch TV shows with pagination and Bearer token authentication
  const fetchTvShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=${page}`, 
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setTvShows(response.data.results);
      setTotalPages(response.data.total_pages);  // Set total pages from the API response
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}  // TV show image
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text>Popularity: {item.popularity}</Text>
        <Text>First Air Date: {item.first_air_date}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('TvDetail', { tvId: item.id, mediaType: 'tv' })}  // Navigate to TV show details
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
        <Picker.Item label="Airing Today" value="airing_today" />
        <Picker.Item label="On the Air" value="on_the_air" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="top_rated" />
      </Picker>

      {/* TV show list */}
      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {page > 1 && (
          <TouchableOpacity style={styles.paginationButtonLeft} onPress={() => setPage(page - 1)}>
            <Icon name="arrow-left" size={20} color="#fff" />
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
    paddingBottom: 10,
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
    backgroundColor: '#c4d3b1',
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
    backgroundColor: '#98ae6c',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationButtonRight: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#98ae6c',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  pageInfo: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pageInfoText: {
    fontSize: 16,
    color: '#98ae6c',
    textAlign: 'center',
    paddingBottom: 10,
  },
});
