import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const API_KEY = 'd2212e9338e21899f29c5010882d13d1'

const API_ACC_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjIxMmU5MzM4ZTIxODk5ZjI5YzUwMTA4ODJkMTNkMSIsIm5iZiI6MTYzMzA4MDIzNC40ODE5OTk5LCJzdWIiOiI2MTU2ZDNhYTE1NmNjNzAwMmMxZjNkNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3vKKFH7_CaHANmn6GNVJ_9QfzZJg6gdaqgFej8CqE78'

const Container = styled.ScrollView`
  background-color: ${prop => prop.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const Movies = () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_ACC_TOKEN}`
    }
  };

  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

  const getNowPlaying = () => {
  }

  return <Container>
    <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
      <View style={{ backgroundColor: 'red' }}></View>
      <View style={{ backgroundColor: 'blue' }}></View>
      <View style={{ backgroundColor: 'red' }}></View>
      <View style={{ backgroundColor: 'blue' }}></View>
    </Swiper>
  </Container>

}

export default Movies;