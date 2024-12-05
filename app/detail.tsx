import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Poster from '@/components/Poster';

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;

const Detail = () => {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title:
        'original_title' in searchParams ? searchParams.original_title : searchParams.original_name,
    });
  }, []);

  return (
    <Container>
      <Poster path={(searchParams.poster_path || '') as string} />
    </Container>
  );
};

export default Detail;
