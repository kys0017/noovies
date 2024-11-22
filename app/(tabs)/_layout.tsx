import React from 'react';
import {Platform, Text, View} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {BLACK_COLOR, Colors, YELLOW_COLOR} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Tabs} from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark'

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? '#d2dae2' : '#808e9b',
        // headerShown: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white'
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
          backgroundColor: isDark ? BLACK_COLOR : 'white'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          title: 'Tv',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          title: 'Explore',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
        }}
      />
    </Tabs>
  );
}
