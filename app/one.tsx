import React from 'react';
import {TouchableOpacity} from "react-native";
import {Link} from "expo-router";

const One = () => {
  return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Link href={{pathname: '/two'}}>Go to two</Link>
    </TouchableOpacity>
  );
};

export default One;