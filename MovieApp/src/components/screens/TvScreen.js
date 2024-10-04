import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons
import CardComponent from '../layout/CardComponent';
import { fetchMedia } from '../../services/HelperFunctions';

export default function TvScreen() {
  const [media, setMedia] = useState([]);
  const [category, setCategory] = useState('airing_today');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const media_type = 'tv';

  useEffect(() => {
    fetchMedia(media_type, category, page, setMedia, setTotalPages);  
  }, [media_type, category, page]);

  const renderItem = ({ item }) => <CardComponent item={item} mediaTypeOverride={media_type} />;

  return (
    <View style={styles.container}>
         <View style={styles.pickerWrapper}>
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
</View>

      <FlatList
        data={media}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

     
      <View style={styles.pagination}>
        {page > 1 && (
          <TouchableOpacity style={styles.paginationButtonLeft} onPress={() => setPage(page - 1)}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <Text style={styles.paginationButtonText}><Icon name="chevron-left" size={13} color="#fff" />  Prev</Text>
          </TouchableOpacity>
        )}
        
        
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
 pickerWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingTop: 0,
    marginBottom: 16,
    width: 200,
  },
  picker: {
    height: 30,
    width: 200,
    alignSelf: 'center',
    marginTop: -10 ,
    marginRight: -5,
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
