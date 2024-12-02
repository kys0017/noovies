import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import HMedia from "@/components/HMedia";

const API_ACC_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjIxMmU5MzM4ZTIxODk5ZjI5YzUwMTA4ODJkMTNkMSIsIm5iZiI6MTYzMzA4MDIzNC40ODE5OTk5LCJzdWIiOiI2MTU2ZDNhYTE1NmNjNzAwMmMxZjNkNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3vKKFH7_CaHANmn6GNVJ_9QfzZJg6gdaqgFej8CqE78'

const Container = styled.ScrollView`
  flex: 1;
`
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`
const ListContainer = styled.View`
  margin-bottom: 40px;
`
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [trending, setTrending] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_ACC_TOKEN}`
    }
  };

  const getTrending = async () => {
    // https://api.themoviedb.org/3/trending/all/{time_window}
    const { results } = await (await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)).json()
    setTrending(results)
  }

  const getUpComing = async () => {
    const { results } = await (await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)).json()
    setUpcoming(results)
  }

  const getNowPlaying = async () => {
    const { results } = await (await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)).json()
    setNowPlaying(results)
  }

  const getData = async () => {
    await Promise.all([getTrending(), getUpComing(), getNowPlaying()])
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, []);

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }

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
          data={trending}
          horizontal
          keyExtractor={(item) => item.id + ''}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
          renderItem={({ item }: { item: any }) => <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
          />}
        />
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
    </>}
    keyExtractor={(item) => item.id + ''}
    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    renderItem={({ item }: { item: any }) => <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
    />}
  />)

}

export default Movies;