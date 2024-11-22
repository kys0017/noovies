import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Movies from "@/screens/movies";
import Tv from "@/screens/tv";
import Search from "@/screens/search";

const Tab = createBottomTabNavigator()
const Tabs = () => <Tab.Navigator>
  <Tab.Screen name="Movies" component={Movies}/>
  <Tab.Screen name="Tv" component={Tv}/>
  <Tab.Screen name="Search" component={Search}/>
</Tab.Navigator>

export default Tabs;