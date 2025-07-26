import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from 'theme';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from 'components/MovieList';
import Cast from 'components/CastComponent';
import Loading from 'components/Loading';
import { fallBackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, img500 } from 'api/MovieDb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

const MovieScreen = () => {
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movie, setMovie] = useState({})
    const movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const { params: item } = useRoute();

    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)

    }, [item]);
    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if (data) { setMovie(data) }
        // console.log(`Movie id is ${id} and the details are : `,data);
        setLoading(false)
    }
    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) { setCast(data.cast); }
        // console.log('The credits are ',data);
        // setLoading(false)
    }
    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) { setSimilarMovies(data.results); }
        // console.log('The similar movies are ',data);
        // setLoading(false)
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* Back and favourite buttons */}
            <SafeAreaView
                className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
            >
                <TouchableOpacity
                    style={styles.background}
                    className="rounded-xl p-1"
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeftIcon color="white" size={28} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Movie poster and content */}
            {loading ? (
                <Loading />
            ) : (
                <>
                    <View>
                        <Image
                            style={{ width, height: height * 0.55 }}
                            source={{ uri: img500(movie?.poster_path) || fallBackMoviePoster }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{
                                width,
                                height: height * 0.4,
                                position: 'absolute',
                                bottom: 0,
                            }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>

                    {/* More details */}
                    <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                        <Text className="text-white text-center text-3xl font-bold tracking-wider">
                            {movie?.title}
                        </Text>
                        <Text className="text-neutral-400 font-semibold my-2 text-base text-center">
                            {movie?.status || 'N/A'} ● {movie?.release_date?.split('-')[0] || 'N/A'} ● {movie?.runtime} min
                        </Text>
                        <View className="flex-row justify-center mx-4 my-2 space-x-2">
                            {movie?.genres?.map((genre, index) => {
                                let showDot = index + 1 != movie.genres.length;
                                return (
                                    <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                        {genre.name} {showDot ? '●' : null} </Text>
                                )
                            })

                            }
                        </View>
                        <Text className="text-neutral-400 mx-4 tracking-wide">
                            {movie?.overview}

                        </Text>
                    </View>

                    {/* Cast */}
                    {cast.length > 0 && <Cast cast={cast} />}
                    {/* Similar movies */}
                    {similarMovies.length > 0 && <MovieList title="Similar movies" data={similarMovies} hideSeeAll={true} />
                    }
                </>
            )}
        </ScrollView>
    );
};

export default MovieScreen;
