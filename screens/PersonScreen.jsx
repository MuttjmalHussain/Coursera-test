import { useNavigation, useRoute } from '@react-navigation/native'
import { fallBackPersonImage, fetchPersonDetails, fetchPersonMovies, img342 } from 'api/MovieDb'
import Loading from 'components/Loading'
import MovieList from 'components/MovieList'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from 'theme'

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? '' : 'my-3';
const PersonScreen = () => {
    const {params:item} = useRoute();
    const [favourite, setFavourite] = useState(false)
    const [personDetails,setPersonDetails] = useState({})
    const [movies, setMovies] = useState([])
    const [loading,setLoading] = useState(false)
    const personName = 'Abrar Khan Soharwardi'
    const address = 'London, United Kingdom'
    const navigation = useNavigation();
    useEffect(()=>{
        setLoading(true)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
        setLoading(false)
    },[item])
    const getPersonDetails= async(id)=>{
        const data = await fetchPersonDetails(id);
        setPersonDetails(data);
        // console.log('The person details are : ', data)
        setPerson
        setLoading(false)
    }
    const getPersonMovies= async(id)=>{
        const data = await fetchPersonMovies(id);
        if(data && data.cast) setMovies(data.cast);
        // console.log('The person movies are : ', data)
        setLoading(false)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
            {/* Back and heart button */}
            <SafeAreaView className={'w-full flex-row justify-between items-center px-4 ' + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-xl p-1'>
                    <ChevronLeftIcon color={'white'} size={28} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFavourite(!favourite)}>
                    <HeartIcon color={favourite ? 'red' : 'white'} size={35} />
                </TouchableOpacity>
            </SafeAreaView>
            {loading?(<Loading />):(
            <View>
                <View className='flex-row items-center justify-center rounded-full' style={{
                    shadowColor: 'gray',
                    shadowRadius: 40,
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 1,
                    elevation: 30,

                    height: !ios && height * 0.4 //self written for android

                }}
                >
                    <View className='items-center w-72 h-72 overflow-hidden rounded-full border-2 border-neutral-500'>
                        {/* <Image style={{ width: width * 0.74, height: height * 0.43 }} source={require('../assets/images/cast1.jpeg')} /> */}
                        <Image style={{ width: width * 0.74, height: height * 0.43 }} source={{uri:img342(personDetails?.profile_path) || fallBackPersonImage}} />
                    </View>
                </View>

                {/* Name address */}
                <View className='mt-6'>
                    <Text className='text-white text-center text-3xl font-bold '>{personDetails?.name}</Text>
                    <Text className='text-neutral-500 text-center text-base'>{personDetails?.place_of_birth}</Text>
                </View>
                {/* Stats */}
                <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Gender</Text>
                        <Text className='text-neutral-300 text-sm'>{personDetails?.gender==1?'Female':"Male" }</Text>
                    </View>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Birthday</Text>
                        <Text className='text-neutral-300 text-sm'>{personDetails?.birthday || 'N/A'}</Text>
                    </View>
                    <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                        <Text className='text-white font-semibold'>Known for</Text>
                        <Text className='text-neutral-300 text-sm'>{personDetails?.known_for_department}</Text>
                    </View>
                    <View className='px-2 items-center'>
                        <Text className='text-white font-semibold'>Popularity</Text>
                        <Text className='text-neutral-300 text-sm'>{personDetails?.popularity?.toFixed(2)} %</Text>
                    </View>
                </View>
                <View className='mt-6 mb-4 mx-4 space-y-4'>
                    <Text className='text-white text-lg mb-1'>Biography</Text>
                    <Text className='text-neutral-400 tracking-wide'>{personDetails?.biography || 'N/A'}</Text>
                </View>

                <MovieList data={movies} title={'Movies'} hideSeeAll={true} />
            </View>
            )}
        </ScrollView>
    )
}

export default PersonScreen