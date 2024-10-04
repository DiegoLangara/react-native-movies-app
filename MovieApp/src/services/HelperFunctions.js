import axios from 'axios';
import { TMDB_ACCESS_TOKEN } from '../config/apiConfig';

const calculateAge = (birthday, deathday = null) => {
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date(); // Use deathday or current date
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = endDate.getMonth() - birthDate.getMonth();


    if (monthDifference < 0 || (monthDifference === 0 && endDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const fetchMedia = async (media_type, category, page, setMedia, setTotalPages) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${category}?language=en-US&page=${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      setMedia(response.data.results);   // Update movies state
      setTotalPages(response.data.total_pages);   // Update total pages state
    } catch (error) {
      console.error(error);
    }
  };


  const searchMedia = async (searchType, query, setResults, setError) => {
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
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      setResults(response.data.results);
      setError(''); 
    } catch (error) {
      console.error(error);
    }
  };


  const fetchItemDetails = async (mediaType, itemId, setMediaDetails, setLoading) => {
    try {

      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${itemId}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        }
      );
      setMediaDetails(response.data);
      setLoading(false);

    } catch (error) {

      console.error('Error fetching movie details:', error);
    }
  };

export { calculateAge, fetchMedia, searchMedia, fetchItemDetails };
