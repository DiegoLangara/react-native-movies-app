import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons
import { calculateAge } from '../../services/HelperFunctions';
import { fetchItemDetails } from '../../services/HelperFunctions';

export default function MediaDetail({ route }) {
  const { itemId, mediaType } = route.params;  // Get the movie ID and media type from route params
  const [mediaDetails, setMediaDetails] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchItemDetails(mediaType, itemId, setMediaDetails, setLoading);
  }, []);


  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>


        <Text style={styles.title}>{mediaDetails.title || mediaDetails.name}</Text>

        {mediaDetails.poster_path || mediaDetails.profile_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${mediaDetails.poster_path || mediaDetails.profile_path}` }}
            style={styles.poster}
          />
        ) : (
          <View style={[styles.poster, styles.placeholder]}>
            <Icon name="image" size={50} color="#ccc" />
          </View>
        )}

        <View style={styles.bdWrapper}>
          {mediaDetails.birthday ? (
            <Text style={styles.birthday}>
              <Text style={styles.bold}>Birthday:</Text> {mediaDetails.birthday}
              {mediaDetails.deathday ? (
                <> <Text style={styles.bold}> | Deceased:</Text> {mediaDetails.deathday} </>
              ) : (
                <> <Text style={styles.bold}> | Age:</Text> {calculateAge(mediaDetails.birthday)} years </>
              )}
            </Text>
          ) : null}

          {mediaDetails.place_of_birth ? (
            <Text style={styles.birthplace}>
              <Text style={styles.bold}>Birthplace:</Text> {mediaDetails.place_of_birth}
            </Text>
          ) : null}
        </View>





        <Text style={styles.overview}>{mediaDetails.overview || mediaDetails.biography}</Text>


        <Text style={styles.info}>
          Popularity: {mediaDetails.popularity} | {mediaType === 'person' ? 'Known for' : 'Release Date'}: {mediaDetails.release_date || mediaDetails.first_air_date || mediaDetails.known_for_department}
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
    backgroundColor: '#f5f5f5',
  },
  bdWrapper: {
    textAlign: 'center',
    marginBottom: 20
  },
  birthday: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  birthplace: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
    color: '#000',
    marginBottom: 10,
  },
});
