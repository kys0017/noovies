import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { useState } from "react";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import HMedia from "@/components/HMedia";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "@/api";
import { useIsFocused } from "@react-navigation/native";

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
  height: 20px;
`;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingDataLoading, data: nowPlayingData } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: movieApi.nowPlaying
  });
  const { isLoading: upcomingDataLoading, data: upcomingData } = useQuery({
    queryKey: ["upcoming"],
    queryFn: movieApi.upcoming
  });
  const { isLoading: trendingDataLoading, data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: movieApi.trending
  });

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

  const loading = nowPlayingDataLoading ||
    upcomingDataLoading ||
    trendingDataLoading;

  // 예전 Tab.Navigation screenOption 에 unmountOnBlur: true 와 같은 효과
  // Tab.Navigation 에서처럼 공통 적용되지 않고 스크린마다 적용해야 한다.
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return loading ? <Loader>
    <ActivityIndicator />
  </Loader> : (<FlatList
    // onRefresh={onRefresh}
    refreshing={refreshing}
    data={upcomingData.results}
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
        {nowPlayingData.results.map((movie: any) => <Slide
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
          data={trendingData.results}
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