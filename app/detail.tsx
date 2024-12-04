import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;

const Detail = () => {
  const { originalTitle = '' } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: originalTitle });
  }, []);

  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
