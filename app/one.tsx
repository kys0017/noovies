import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {Link, Stack} from "expo-router";

const One = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity>
        <Link href={{pathname: './two'}}>Go to two</Link>
      </TouchableOpacity>
    </View>
  );
};

export default One;