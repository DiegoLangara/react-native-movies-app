import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';  // For back navigation
import { TMDB_ACCESS_TOKEN } from '../../config/apiConfig';

export default function TvDetail({ route }) {
  const { tvId, mediaType } = route.params;
  const [tvDetails, setTvDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // Use for the back button

  useEffect(() => {
    fetchTvDetails();
  }, []);

  const fetchTvDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setTvDetails(response.data);
      setLoading(false);
   //   navigation.setOptions({ title: response.data.title || response.data.name });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{tvDetails.name}</Text>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.overview}>{tvDetails.overview}</Text>
      <Text style={styles.info}>First Air Date: {tvDetails.first_air_date}</Text>
      <Text style={styles.info}>Popularity: {tvDetails.popularity}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 250,
    height: 375,
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
