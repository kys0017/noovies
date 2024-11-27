import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Stack, useNavigation} from "expo-router";

const Three = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity>
        <Text onPress={() => navigation.setOptions({headerTitle: 'ddd'})}>Change title</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Three;