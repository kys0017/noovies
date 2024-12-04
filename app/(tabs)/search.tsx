import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useQuery } from '@tanstack/react-query';
import { movieApi, tvApi } from '@/api';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState('');

  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ['searchMovies', query],
    queryFn: movieApi.search,
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ['searchTv', query],
    queryFn: tvApi.search,
    enabled: false,
  });

  const onChaneText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === '') return;

    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChaneText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};

export default Search;
