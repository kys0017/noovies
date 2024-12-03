import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { useState } from "react";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import HMedia from "@/components/HMedia";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Movie, movieApi, MovieResponse } from "@/api";
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
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingDataLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: movieApi.nowPlaying
  });
  const {
    isLoading: upcomingDataLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: movieApi.upcoming
  });
  const {
    isLoading: trendingDataLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: movieApi.trending
  });

  const onRefresh = async () => {
    queryClient.refetchQueries({ queryKey: ['movies'] });
  };

  const loading = nowPlayingDataLoading ||
    upcomingDataLoading ||
    trendingDataLoading;

  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  // console.log(Object.values(nowPlayingData?.results[0]).map(v => typeof v));

  // 예전 Tab.Navigation screenOption 에 unmountOnBlur: true 와 같은 효과
  // Tab.Navigation 에서처럼 공통 적용되지 않고 스크린마다 적용해야 한다.
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return loading ? <Loader>
    <ActivityIndicator />
  </Loader> : upcomingData && (<FlatList
    onRefresh={onRefresh}
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
        {nowPlayingData?.results.map((movie: any) => <Slide
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
        {trendingData ? <TrendingScroll
          horizontal
          data={trendingData.results}
          keyExtractor={item => (item as unknown as Movie).id + ''}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={VSeparator}
          renderItem={({ item }) => <VMedia
            posterPath={(item as unknown as Movie).poster_path}
            originalTitle={(item as unknown as Movie).original_title}
            voteAverage={(item as unknown as Movie).vote_average}
          />}
        /> : null}
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
    </>}
    keyExtractor={item => item.id + ''}
    ItemSeparatorComponent={HSeparator}
    renderItem={({ item }) => <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
    />}
  />) || null;

};

export default Movies;