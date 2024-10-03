import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import the Stack Navigator

import MovieScreen from '../components/screens/MoviesScreen';
import SearchScreen from '../components/screens/SearchScreen';
import TvScreen from '../components/screens/TvScreen';
import MovieDetail from '../components/screens/MovieDetail';  // MovieDetail screen
import TvDetail from '../components/screens/TvDetail';  // TvDetail screen


// Create the stack navigator
const Stack = createNativeStackNavigator();

// Define the tab navigation
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MovieScreen"
      screenOptions={{
        tabBarActiveTintColor: '#0f4067',
        tabBarInactiveTintColor: 'lightgray',
        tabBarLabelStyle: { 
          fontSize: 14, 
          textTransform: 'none', 
          fontWeight: 'bold', 
          padding: 0,
          width: '100%',
          textAlign: 'center',
        },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { 
          backgroundColor: '#0f4067', 
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{ tabBarLabel: 'Movies' }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search Results' }}
      />
      <Tab.Screen
        name="TvScreen"
        component={TvScreen}
        options={{ tabBarLabel: 'TV Shows' }}
      />
    </Tab.Navigator>
  );
}

// Define the root navigator with Stack containing tabs and MovieDetail
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tab navigator with Movies, Search, and TV Shows */}
        <Stack.Screen 
          name="MainTabs" 
          component={MyTabs} 
          options={{ headerShown: false }}  // Hide the header for the tab navigator
        />
        {/* MovieDetail screen */}
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetail}
          options={{ title: 'Move Details',
            headerTitleAlign: 'center',  // Center the title
            headerTitleStyle: {           // Apply custom style to the title
              fontSize: 20,
              fontWeight: 'bold',
              color: '#0f4067',
            },
            headerStyle: {                // You can also style the header background
              backgroundColor: '#9edbe7',  // Light gray background
            },
           }} 
         
        />
        <Stack.Screen 
  name="TvDetail" 
  component={TvDetail} 
  options={{ title: 'TV Details',
    headerTitleAlign: 'center',  // Center the title
    headerTitleStyle: {           // Apply custom style to the title
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2D3420',
    },
    headerStyle: {                // You can also style the header background
      backgroundColor: '#98ae6c',  // Light gray background
    },
   }} 
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

