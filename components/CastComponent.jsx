import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallBackPersonImage, img185 } from 'api/MovieDb'

var { height, width } = Dimensions.get('window')
const Cast = ({ cast }) => {
    const navigation = useNavigation();
    const personName = 'Abrar Khan Soharwardi'
    const characterName = 'Doremon Nobi'
    return (
        <View className='my-6'>
            <Text className='text-white text-xl mx-4 mb-5'>Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast && cast.map((person, index) => <TouchableOpacity key={index} className='mr-4 items-center' onPress={()=>navigation.navigate('Person',person)}>
                    <View className='rounded-full overflow-hidden w-20 h-20 border border-neutral-500'>
                        {/* <Image source={require('../assets/images/cast1.jpeg')} className='h-24 w-20 rounded-2xl' /> */}
                        <Image source={{uri:img185(person?.profile_path) || fallBackPersonImage}} className='h-24 w-20 rounded-2xl' />

                    </View>
                    <Text className='text-white text-xs mt-1'>{person?.character.length>10?person?.character.slice(0,10)+'...':person?.character}</Text>
                    <Text className='text-neutral-500 text-xs mt-1'>{person?.original_name.length>10?person?.original_name.slice(0,10)+'...':person?.original_name}</Text>
                </TouchableOpacity>)}
            </ScrollView>
        </View>
        // <Text>hey there</Text>
    )
}

export default Cast