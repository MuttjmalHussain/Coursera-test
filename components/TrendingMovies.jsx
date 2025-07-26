import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { img500 } from 'api/MovieDb';

const { height, width } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        width={width * 0.62}
        height={height * 0.4}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        style={{ alignSelf: 'center' }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  if (!item?.poster_path) return null;

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: img500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
