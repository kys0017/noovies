import React from 'react';
import {Stack} from "expo-router";

function MoviesLayout() {
  return (
    <Stack screenOptions={{headerTitle: 'Movies'}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='one'/>
      <Stack.Screen name='two'/>
      <Stack.Screen name='three'/>
    </Stack>
  );
}

export default MoviesLayout;