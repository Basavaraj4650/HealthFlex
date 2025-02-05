import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from './src/screens/History/History';
import Catagary from './src/screens/Catagary/Catagary';
import {COLORS} from './src/constants/theme';
import Dashboard from './src/screens/Dashboard/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.black,
        }}>
        <Tab.Screen
          name="MainHome"
          component={Dashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
            headerTitle: 'Home',
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="history" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Catagary"
          component={Catagary}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="bars" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={HomeTabs} />
        <Stack.Screen name="Catagary" component={Catagary} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
