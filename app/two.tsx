import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {Link, Stack} from "expo-router";

const Two = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity>
        <Link href={{pathname: './three'}}>Go to three</Link>
      </TouchableOpacity>
    </View>
  );
};

export default Two;