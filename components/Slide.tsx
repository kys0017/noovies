import styled from 'styled-components/native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { makeImgPath } from '@/utils';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/useColorScheme';
import Poster from '@/components/Poster';
import { useRouter } from 'expo-router';
import { Movie } from '@/api';

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${props => (props.isDark ? 'rgba(255, 255, 255, .8)' : 'rgba(0, 0, 0, .8)')};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

export default function Slide({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}: SlideProps) {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const goToDetail = () => {
    // @ts-ignore
    router.navigate({ pathname: '/detail', params: { ...fullData } });
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdropPath) }} />
        <BlurView
          tint={isDark ? 'dark' : 'light'}
          intensity={80}
          style={{
            flex: 1,
            padding: 1,
          }}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 && <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes>}
              <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
}
