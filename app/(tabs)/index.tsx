import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import Slide from "@/components/slide";

const API_KEY = 'd2212e9338e21899f29c5010882d13d1'

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

const Movies = () => {
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
    const { results } = await (await fetch('https://api.themoviedb.org/3/movie/trending/movie/week?language=en-US', options)).json()
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

  return loading ? <Loader>
    <ActivityIndicator />
  </Loader> : <Container>
    <Swiper
      horizontal
      loop
      autoplay
      autoplayTimeout={3.5}
      showsButtons={false}
      showsPagination={false}
      containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
      {nowPlaying.map((movie: any) => <Slide
        backdropPath={movie.backdrop_path}
        posterPath={movie.poster_path}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        originalTitle={movie.original_title}
        key={movie.id} />)}
    </Swiper>
  </Container>

}

export default Movies;