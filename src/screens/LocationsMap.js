import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const LocationsMap = () => {
  const navigation = useNavigation();
  const { locations } = useSelector((state) => state.app);
  const [mapRegion, setMapRegion] = useState(null);

  const fetchCurrentLocation = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Error',
        'Permission to access location was denied!!'
      );
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {locations &&
          locations.map((location, index) => (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title={location.locationName}
              key={index}
            />
          ))}
      </MapView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicon
            name="arrow-back-outline"
            color="white"
            size={25}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 0,
    left: 0,
    right: 0,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 50,
    padding: 5,
    opacity: 0.8,
  },
});

export default LocationsMap;
