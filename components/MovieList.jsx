import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, FlatList } from 'react-native'
import { styles } from '../theme/index'
import { useNavigation } from '@react-navigation/native'
import { fallBackMoviePoster, img185 } from 'api/MovieDb';
var { width, height } = Dimensions.get('window');
const MovieList = ({ title, data, hideSeeAll }) => {
    const navigation = useNavigation();
    let movieName = 'Jumanji'
    return (
        <View className='mb-8 space-y-4'>
            <View className='flex-row justify-between mx-4'>
                <Text className='text-white text-xl'>{title}</Text>
                {
                    !hideSeeAll && (<TouchableOpacity>
                        <Text style={styles.text} className='text-lg'>See All</Text>
                    </TouchableOpacity>)
                }
            </View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 15 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => navigation.push('Movie', item)}>
                        <View className='space-y-1 mr-4'>
                            <Image source={{ uri: img185(item.poster_path) || fallBackMoviePoster }} className='rounded-3xl' style={{ width: width * 0.33, height: height * 0.22 }}
                            />
                            
                            <Text className='text-neutral-300 ml-1'>
                                {(() => {
                                    const name = item.title ?? item.original_name ?? 'Untitled';
                                    return name.length > 14 ? name.slice(0, 14) + '...' : name;
                                })()}
                            </Text>

                        </View>

                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    )
}

export default MovieList


