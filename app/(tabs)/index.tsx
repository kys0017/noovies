import {Text} from 'react-native';
import {useRouter} from "expo-router";
import React from "react";
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBgColor};
`

const Title = styled.Text<{ selected?: boolean }>`
    color: ${props => props.theme.textColor}
`

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Btn onPress={() => router.push('/one')}>
      <Text>Home</Text>
      <Title>Go to One</Title>
    </Btn>
  );
}