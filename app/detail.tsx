import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Poster from '@/components/Poster';
import { Dimensions, StyleSheet } from 'react-native';
import { makeImgPath } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '@/constants/Colors';

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

const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

const Detail = () => {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'original_title' in searchParams ? 'Movie' : 'TV Show',
    });
  }, []);

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
      <Overview>{searchParams.overview}</Overview>
    </Container>
  );
};

export default Detail;
