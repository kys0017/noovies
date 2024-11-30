import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { makeImgPath } from "@/utils";
import { BlurView } from "expo-blur";

const API_KEY = 'd2212e9338e21899f29c5010882d13d1'

const API_ACC_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjIxMmU5MzM4ZTIxODk5ZjI5YzUwMTA4ODJkMTNkMSIsIm5iZiI6MTYzMzA4MDIzNC40ODE5OTk5LCJzdWIiOiI2MTU2ZDNhYTE1NmNjNzAwMmMxZjNkNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3vKKFH7_CaHANmn6GNVJ_9QfzZJg6gdaqgFej8CqE78'

const Container = styled.ScrollView`
  flex: 1;
`

const View = styled.View`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const BgImg = styled.Image`
`

const Title = styled.Text`
  font-size: 24px
`

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const Movies = () => {
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_ACC_TOKEN}`
    }
  };

  const getNowPlaying = async () => {
    const { results } = await (await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)).json()
    setNowPlaying(results)
    setLoading(false)
  }

  useEffect(() => {
    getNowPlaying()
  }, []);

  return loading ? <Loader>
    <ActivityIndicator/>
  </Loader> : <Container>
    <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
      {nowPlaying.map((movie: any) => <View key={movie.id}>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(movie.backdrop_path) }}/>
        <BlurView intensity={80} style={{
          flex: 1,
          padding: 1,
        }}>
          <Title>{movie.original_title}</Title>
        </BlurView>
      </View>)}
    </Swiper>
  </Container>

}

export default Movies;