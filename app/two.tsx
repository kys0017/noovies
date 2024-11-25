import React from 'react';
import {TouchableOpacity} from "react-native";
import {Link} from "expo-router";

const Two = () => {
  return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Link href={{pathname: '/three'}}>Go to three</Link>
    </TouchableOpacity>
  );
};

export default Two;