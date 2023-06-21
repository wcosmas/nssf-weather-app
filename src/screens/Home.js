import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, useToast } from 'native-base';

import { openWeatherMapApiKey } from '../utils/constants';
import DegreesText from '../components/DegreesText';
import Divider from '../components/Divider';
import WeeklyWeatherItem from '../components/WeeklyWeatherItem';
import {
  kelvinToCelsius,
  getDistanceUsingGoogleMaps,
} from '../utils/helpers';
import {
  weatherBackgrounds,
  weatherBgImages,
} from '../utils/constants';
import {
  saveCurrentLocation,
  saveWeatherUpdates,
  saveLocations,
} from '../store/AppSlice';

const Home = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeeklyForecast = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&exclude=current,minutely,hourly&appid=${openWeatherMapApiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    setLoading(false);
    if (!response.ok) {
      Alert.alert(
        'Error',
        'An error occurred while fetching the forecast.'
      );
    } else {
      setWeeklyForecast(data);
      dispatch(saveWeatherUpdates(data));
    }
  };

  useEffect(() => {
    checkLocationPermissions();
  }, []);
  useEffect(() => {
    if (location) {
      fetchWeeklyForecast();
    }
  }, [location]);

  const getWeatherUpdateBg = (weatherUpdate) => {
    let bgColor = weatherBackgrounds[weatherUpdate];
    if (bgColor) {
      return { backgroundColor: bgColor };
    } else {
      return { backgroundColor: '#628594' };
    }
  };
  const getWeatherUpdateBgImage = (weatherUpdate) => {
    let bgImage = weatherBgImages[weatherUpdate];
    if (bgImage) {
      return bgImage;
    } else {
      return require('../../assets/Images/sea_cloudy.png');
    }
  };

  const getStatusBarColor = (weatherUpdate) => {
    let bgColor = weatherBackgrounds[weatherUpdate];
    if (bgColor) {
      return bgColor;
    } else {
      return '#628594';
    }
  };

  const checkLocationPermissions = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Error',
        'Permission to access location was denied!!'
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const locationName = await getDistanceUsingGoogleMaps(
      location?.coords.latitude,
      location?.coords.longitude
    );
    if (locationName) {
      setLocation({ ...location, locationName });
      dispatch(saveCurrentLocation({ ...location, locationName }));
    }
  };

  const saveLocation = () => {
    dispatch(saveLocations(location));
    toast.show({
      description: 'Location Saved!!',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={getStatusBarColor(
          weeklyForecast?.daily[0].weather[0].main
        )}
      />
      <View style={styles.weatherContainer}>
        <ImageBackground
          source={getWeatherUpdateBgImage(
            weeklyForecast?.daily[0].weather[0].main
          )}
          style={{ height: '100%' }}
        >
          <View style={styles.header}>
            <View style={styles.headerUpper}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
              >
                <Feather name="menu" color="#fff" size={25} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerUpper}>
              <Tooltip label="Save Location" openDelay={10}>
                <TouchableOpacity onPress={saveLocation}>
                  <Feather name="download" color="#fff" size={25} />
                </TouchableOpacity>
              </Tooltip>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                {location?.locationName ? location?.locationName : ''}
              </Text>
            </View>
            <View style={styles.degreesContainer}>
              <Text style={styles.degreesText}>
                {weeklyForecast
                  ? kelvinToCelsius(weeklyForecast?.daily[0].temp.day)
                  : '0'}
              </Text>
              <Text style={styles.superscriptText}>o</Text>
            </View>
            <Text style={styles.degreesText}>
              {weeklyForecast
                ? weeklyForecast?.daily[0].weather[0].main
                : ''}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.weeklyUpdatesContainer,
          getWeatherUpdateBg(
            weeklyForecast?.daily[0].weather[0].main
          ),
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <DegreesText
            degrees={
              weeklyForecast
                ? kelvinToCelsius(weeklyForecast?.daily[0].temp.min)
                : 0
            }
            measure="min"
          />
          <DegreesText
            degrees={
              weeklyForecast
                ? kelvinToCelsius(weeklyForecast?.daily[0].temp.day)
                : 0
            }
            measure="current"
          />
          <DegreesText
            degrees={
              weeklyForecast
                ? kelvinToCelsius(weeklyForecast?.daily[0].temp.max)
                : 0
            }
            measure="max"
          />
        </View>
        <Divider />
        {loading ? (
          <View style={styles.loadingIndicator}>
            <Text style={{ color: '#fff', fontSize: 19 }}>
              Fetching Forecast...
            </Text>
            <ActivityIndicator color="#fff" />
          </View>
        ) : (
          <FlatList
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={weeklyForecast?.daily.slice(1)}
            renderItem={WeeklyWeatherItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherContainer: {
    flex: 2,
    backgroundColor: 'red',
  },
  weeklyUpdatesContainer: {
    flex: 2.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerUpper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  degreesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  degreesText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  superscriptText: {
    color: '#ffff',
    fontSize: 20,
    lineHeight: 20,
    marginLeft: 2,
    marginBottom: 30,
    textAlignVertical: 'top',
  },
  loadingIndicator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
});

export default Home;
