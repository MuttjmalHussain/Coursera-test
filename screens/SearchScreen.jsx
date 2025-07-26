import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import Loading from 'components/Loading'
import debounce from 'lodash/debounce'
import { fallBackMoviePoster, img185, searchMovies } from 'api/MovieDb'
var { width, height } = Dimensions.get('window')
const SearchScreen = () => {
    const [results, setResults] = useState([])
    const [loading,setLoading] = useState(false)
    let movieName = 'Jumanji'
    const naviagtion = useNavigation();
    const handleSearch = (value) =>{
        // console.log(value);
        if(value && value.length>2){
            setLoading(true)
        searchMovies({query: value, include_adult: 'false', language: 'en-US', page: '1'

        }).then(data=>{setLoading(false) 
            if(data && data.results)setResults(data.results)})
        }else{
            setLoading(false);
            setResults([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
    // const handleTextDebounce =     debounce(handleSearch,400)
    
    return (
        <SafeAreaView className='bg-neutral-800 flex-1 '>
            <View className='mx-4 mb-3 mt-4 flex-row items-center border border-neutral-500 rounded-full'>
                <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgray'} className='pb-1 pt-1 pl-6 flex-1 text-base tracking-white text-white' />
                <TouchableOpacity onPress={() => naviagtion.navigate('Home')} className='bg-neutral-500 p-3 m-1 rounded-full'>
                    <XMarkIcon size={25} color={'white'} />
                </TouchableOpacity>
            </View>
           {loading?(
            <Loading />
           ):(
             results.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15,paddingBottom:10 }}
                    className='space-y-3'>
                    <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
                    <View className='flex-row justify-between flex-wrap' >
                        {results.map((item, index) => <TouchableWithoutFeedback key={index} onPress={() => naviagtion.navigate('Movie',item)}>
                            <View className='mt-3'>
                                <Image source={{uri:img185(item?.poster_path) || fallBackMoviePoster}} style={{ width: width * 0.44, height: height * 0.3 }} className='rounded-3xl' />
                                <Text className='text-neutral-300 text-center'>
                                    {item?.title.length > 20 ? item?.title.slice(0, 20) + '...' : item?.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>)}
                    </View>
                </ScrollView>
            ) : (<View className='flex-row justify-center mt-4'>
                <Image className='w-80 h-80' source={require('../assets/images/watchMovie.png')} />
            </View>)
           )}

        </SafeAreaView>
    )
}

export default SearchScreen 