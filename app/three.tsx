import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "expo-router";

const Three = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={() => navigation.setOptions({headerTitle: 'ddd'})}>Change title</Text>
    </TouchableOpacity>
  );
};

export default Three;