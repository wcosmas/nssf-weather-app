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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import DegreesText from '../components/DegreesText';
import Divider from '../components/Divider';
import WeeklyWeatherItem from '../components/WeeklyWeatherItem';
import { convertFahrenheitToCelsius } from '../utils/helpers';
import {
  weatherBackgrounds,
  weatherBgImages,
} from '../utils/constants';

const openWeatherMapApiKey = 'ca05bc8175a67d7b5076562e664ba7c6';

const Home = () => {
  const navigation = useNavigation();
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeeklyForecast = async () => {
    setLoading(true);

    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Location permission access was denied!!');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&exclude=current,minutely,hourly&appid=${openWeatherMapApiKey}`;
    setLocation(location);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(
        'Error',
        'An error occurred while fetching the forecast.'
      );
    } else {
      setWeeklyForecast(data);
    }
  };

  useEffect(() => {
    fetchWeeklyForecast();
  }, []);

  const getWeatherUpdateBg = (weatherUpdate) => {
    let bgColor = weatherBackgrounds[weatherUpdate];
    if (bgColor) {
      return { backgroundColor: bgColor };
    } else {
      return { backgroundColor: '#47AB2F' };
    }
  };
  const getWeatherUpdateBgImage = (weatherUpdate) => {
    let bgImage = weatherBgImages[weatherUpdate];
    if (bgImage) {
      return bgImage;
    } else {
      return require('../../assets/Images/sea_rainy.png');
    }
  };

  const getStatusBarColor = (weatherUpdate) => {
    let bgColor = weatherBackgrounds[weatherUpdate];
    if (bgColor) {
      return bgColor;
    } else {
      return '#47AB2F';
    }
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
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.degreesContainer}>
              <Text style={styles.degreesText}>
                {weeklyForecast
                  ? convertFahrenheitToCelsius(
                      weeklyForecast?.daily[0].temp.day
                    )
                  : ''}
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
                ? convertFahrenheitToCelsius(
                    weeklyForecast?.daily[0].temp.min
                  )
                : 0
            }
            measure="min"
          />
          <DegreesText
            degrees={
              weeklyForecast
                ? convertFahrenheitToCelsius(
                    weeklyForecast?.daily[0].temp.day
                  )
                : 0
            }
            measure="current"
          />
          <DegreesText
            degrees={
              weeklyForecast
                ? convertFahrenheitToCelsius(
                    weeklyForecast?.daily[0].temp.max
                  )
                : 0
            }
            measure="max"
          />
        </View>
        <Divider />
        {weeklyForecast && (
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
    flex: 3,
  },
  header: {
    flexDirection: 'column',
  },
  headerUpper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    lineHeight: 10,
    marginLeft: 2,
    marginBottom: 35,
    textAlignVertical: 'top',
  },
});

export default Home;
