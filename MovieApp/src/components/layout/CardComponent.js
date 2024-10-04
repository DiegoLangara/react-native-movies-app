import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function CardComponent({ item, mediaTypeOverride }) {
    const navigation = useNavigation();

    const mediaType = item.media_type || mediaTypeOverride;

    return (
        <View style={styles.card}>
            {item.poster_path || item.profile_path ? (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}` }}
                    style={styles.image}
                />
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                    <Icon name="image" size={50} color="#ccc" />
                </View>
            )}

            <View style={styles.cardContent}>
                <Text style={styles.itemTitle}>
                    {item.title || item.name}
                </Text>
                <Text>Popularity: {item.popularity}</Text>
                <Text>{mediaType === 'person' ? 'Known for' : 'Release Date'}: {item.release_date || item.first_air_date || item.known_for_department}</Text>

                <TouchableOpacity
                    style={
                        mediaType === 'person'
                            ? styles.detailsButtonPerson
                            : mediaType === 'tv'
                                ? styles.detailsButtonTv
                                : styles.detailsButtonMovie
                    }
                    onPress={() => {
                        if (mediaType === 'person') {
                            navigation.navigate('PersonDetail', { itemId: item.id, mediaType: mediaType });
                        } else if (mediaType === 'tv') {
                            navigation.navigate('TvDetail', { itemId: item.id, mediaType: mediaType });
                        } else {
                            navigation.navigate('MovieDetail', { itemId: item.id, mediaType: mediaType });
                        }
                    }}
                >
                    <Text style={styles.detailsButtonText}>
                        More Details  <Icon name={mediaType === 'person' ? 'user-o' : mediaType === 'tv' ? 'tv' : 'film'} size={16} color="#fff" />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
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
    detailsButtonMovie: {
        backgroundColor: '#9edbe7',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    detailsButtonTv: {
        backgroundColor: '#c4d3b1',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    detailsButtonPerson: {
        backgroundColor: '#d7bcb4',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    detailsButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
