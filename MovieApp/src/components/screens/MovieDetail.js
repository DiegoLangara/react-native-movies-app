import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';  // For back navigation
import { TMDB_ACCESS_TOKEN } from '../../config/apiConfig';

export default function MovieDetail({ route }) {
  const { movieId, mediaType } = route.params;  // Get the movie ID and media type from route params
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // Use for the back button

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  // Fetch movie details using the movie ID passed via navigation
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movieId}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setMovieDetails(response.data);
      setLoading(false);

      // Dynamically set the movie title in the top bar
  //    navigation.setOptions({ title: response.data.title || response.data.name });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
       
        {/* Movie Title */}
        <Text style={styles.title}>{movieDetails.title || movieDetails.name}</Text>

        {/* Movie Poster */}
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}  // Movie poster from TMDB
          style={styles.poster}
        />

        {/* Movie Overview */}
        <Text style={styles.overview}>{movieDetails.overview}</Text>

        {/* Popularity and Release Date */}
        <Text style={styles.info}>
          Popularity: {movieDetails.popularity} | Release Date: {movieDetails.release_date || movieDetails.first_air_date}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',  // Light background for contrast
  },
  backButton: {
    fontSize: 16,
    color: '#007bff',  // A nice blue color for the back button
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 250,
    height: 375,  // Aspect ratio of 2:3
    alignSelf: 'center',
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginBottom: 10,
  },
});
