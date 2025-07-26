import axios from "axios";
import { MOVIE_API_KEY } from "constants";

const baseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${MOVIE_API_KEY}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${MOVIE_API_KEY}`;
const topratedMoviesEndpoint = `${baseUrl}/tv/top_rated?api_key=${MOVIE_API_KEY}`;

const movieDetailsEndpoint = (id) => `${baseUrl}/movie/${id}?api_key=${MOVIE_API_KEY}`;
const movieCreditsEndpoint = (id) => `${baseUrl}/movie/${id}/credits?api_key=${MOVIE_API_KEY}`;
const similarMoviesEndpoint = (id) => `${baseUrl}/movie/${id}/similar?api_key=${MOVIE_API_KEY}`;

const personDetailsEndpoint = (id) => `${baseUrl}/person/${id}?api_key=${MOVIE_API_KEY}`;
const personMoviesEndpoint = (id) => `${baseUrl}/person/${id}/movie_credits?api_key=${MOVIE_API_KEY}`;

const searchMovieEndpoint = `${baseUrl}/search/movie?api_key=${MOVIE_API_KEY}`;

export const img500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const img342 = (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const img185 = (path) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallBackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg'
export const fallBackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options);
        return response.data;

    } catch (error) {
        console.log('Error: ', error)
        return;
    }
}
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopratedMovies = () => {
    return apiCall(topratedMoviesEndpoint)
}
export const fetchMovieDetails =id=> {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits =id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies =id=> {
    return apiCall(similarMoviesEndpoint(id))
}
export const fetchPersonDetails = (id) =>{
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = (id) =>{
    return apiCall(personMoviesEndpoint(id))
}
export const searchMovies = (params) =>{
    return apiCall(searchMovieEndpoint,params)
}