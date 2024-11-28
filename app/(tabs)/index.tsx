import {StyleSheet, Text, View} from 'react-native';
import {useRouter} from "expo-router";
import React from "react";
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text<{ selected: boolean }>`
    color: ${props => props.selected ? 'blue' : 'red'}
`

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Btn onPress={() => router.push('/one')}>
      <Text>Home</Text>
      <Title selected={true}>Go to One</Title>
    </Btn>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: {
    color: 'blue'
  }
});
