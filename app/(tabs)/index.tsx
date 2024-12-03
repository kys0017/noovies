import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import HMedia from "@/components/HMedia";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  width: 20px;
`;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  };

  const renderVMedia = ({ item }) => <VMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
  />;

  const renderHMedia = ({ item }) => <HMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    overview={item.overview}
  />;

  const movieKeyExtractor = (item) => item.id + '';

  return loading ? <Loader>
    <ActivityIndicator />
  </Loader> : (<FlatList
    onRefresh={onRefresh}
    refreshing={refreshing}
    data={upcoming}
    ListHeaderComponent={<>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie: any) => <Slide
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          overview={movie.overview}
          voteAverage={movie.vote_average}
          originalTitle={movie.original_title}
          key={movie.id}
        />)}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          data={trending}
          keyExtractor={movieKeyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={VSeparator}
          renderItem={renderVMedia}
        />
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
    </>}
    keyExtractor={movieKeyExtractor}
    ItemSeparatorComponent={HSeparator}
    renderItem={renderHMedia}
  />);

};

export default Movies;