import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import SavedLocations from '../screens/SavedLocations';
import LocationsMap from '../screens/LocationsMap';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#145FA7',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -23,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="LocationsScreen"
        component={SavedLocations}
        options={{
          title: 'Favourite Locations',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons
              name="location-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LocationsMapScreen"
        component={LocationsMap}
        options={{
          title: 'Locations Map',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="map-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
