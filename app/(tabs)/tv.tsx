import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tvApi } from '@/api';
import Loader from '@/components/Loader';
import HList from '@/components/HList';

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery({
    queryKey: ['tv', 'today'],
    queryFn: tvApi.airingToday,
  });
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery({
    queryKey: ['tv', 'top'],
    queryFn: tvApi.topRated,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: tvApi.trending,
  });

  const onRefresh = () => {
    queryClient.refetchQueries({ queryKey: ['tv'] });
  };

  const loading = todayLoading || topLoading || trendingLoading;

  const refreshing = todayRefetching || topRefetching || trendingRefetching;
  console.log(refreshing);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30 }}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
