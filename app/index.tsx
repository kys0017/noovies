import {Link, Stack} from 'expo-router';
import {Text, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Stack.Screen
        options={{
          title: 'Home',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Text>Home</Text>
      <Link href={{pathname: '/one', params: {name: 'Bacon'}}}>Go to One</Link>
    </View>
  );
}

