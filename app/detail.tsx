import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Poster from '@/components/Poster';
import {
  Dimensions,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { makeImgPath } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { movieApi, tvApi } from '@/api';
import Loader from '@/components/Loader';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 70%;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Data = styled.View`
  padding: 0 20px;
`;
const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 20px 0;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const ShareButton = ({ onPress }: { onPress: TouchableOpacityProps['onPress'] }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="share-outline" color="white" size={24} />
  </TouchableOpacity>
);

const Detail = () => {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();
  const isMovie = 'original_title' in searchParams;

  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? 'movies' : 'tv', searchParams.id],
    queryFn: (isMovie ? movieApi : tvApi).detail,
  });

  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie ? `https://www.imdb.com/title/${data.imdb_id}` : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${searchParams.overview}\nCheck it out: ${homepage}`,
        title: (isMovie ? searchParams.original_title : searchParams.original_name) as string,
      });
    } else {
      await Share.share({
        url: homepage,
        title: (isMovie ? searchParams.original_title : searchParams.original_name) as string,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'original_title' in searchParams ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ShareButton onPress={shareMedia} />,
    });
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath((searchParams?.backdrop_path || '') as string) }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={(searchParams.poster_path || '') as string} />
          <Title>
            {'original_title' in searchParams
              ? searchParams.original_title
              : searchParams.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{searchParams.overview}</Overview>
        {isLoading && <Loader />}
        {data?.videos?.results?.map((video: any) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
