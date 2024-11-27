import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";

const Three = () => {
  const router = useRouter();

  const onPress = () => {
    router.push('/(tabs)/search')
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity>
        <Text onPress={onPress}>Go to search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Three;