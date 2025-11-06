import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapAndListScreen from './screens/MapAndListScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const FinderStack = createNativeStackNavigator();

function FinderStackScreen() {
  return (
    <FinderStack.Navigator>
      <FinderStack.Screen name="MapAndList" component={MapAndListScreen} options={{ title: 'Finder' }} />
      <FinderStack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: 'Shop Detail' }} />
    </FinderStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'Finder' ? 'map' : 'star';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Finder" component={FinderStackScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
