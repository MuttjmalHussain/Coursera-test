import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from '../theme/index'
import TrendingMovies from 'components/TrendingMovies';
import MovieList from 'components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from 'components/Loading';
import { fetchTopratedMovies, fetchTrendingMovies, fetchUpcomingMovies } from 'api/MovieDb';
const HomeScreen = () => {
  const ios = Platform.OS == 'ios';
  const navigation = useNavigation();
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [toprated, setToprated] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovie();
    getTopratedMovies();
  }, [])
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('Got trending moives : ', data)
    if(data && data.results ){
      setTrending(data.results)
    }
    setLoading(false)

  }
  const getUpcomingMovie = async ()=>{
    const data = await fetchUpcomingMovies();
    // console.log('Upcoming movies are : ', data);
    if(data && data.results){
      setUpcoming(data.results)
    }
  }
  const getTopratedMovies = async()=>{
    const data = await fetchTopratedMovies();
    // console.log('The id of toprated : ', data.results.id)
    if(data && data.results) setToprated(data.results)
  }
  return (
    <View className='flex-1 bg-neutral-800' >
      {/* Search bar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <View className='flex-row items-center justify-between mx-4'>
          <Bars3CenterLeftIcon size='30' strokeWidth='2' color={'white'} />
          <Text className='text-white text-3xl font-bold'><Text style={styles.text}>M</Text>ovies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={'30'} strokeWidth={'2'} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending movies carousel */}
        {trending.length>0 && <TrendingMovies data={trending} />}
        {/* Upcoming movies */}
        <MovieList title={'Upcoming'} data={upcoming} />

        <MovieList title={'Top Rated'} data={toprated} />
      </ScrollView>)}
    </View>
  )
}

export default HomeScreen