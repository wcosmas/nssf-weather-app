import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { kelvinToCelsius, getDayOfWeek } from '../utils/helpers';

import { weatherIcons } from '../utils/constants';

const WeeklyWeatherItem = ({ item, index }) => {
  const getWeatherIcon = (weatherUpdate) => {
    let icon = weatherIcons[weatherUpdate];
    if (icon) {
      return icon;
    } else {
      return require('../../assets/Icons/clouds_twox.png');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 3,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {getDayOfWeek(index)}
        </Text>
        <Image
          style={{ height: 20, width: 20, marginRight: 70 }}
          source={getWeatherIcon(item?.weather[0].main)}
        />
      </View>

      <View style={styles.degreeContainer}>
        <Text style={styles.degreeText}>
          {kelvinToCelsius(item?.temp?.day)}
        </Text>
        <Text style={styles.superscript}>o</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  degreeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  degreeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  superscript: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 10,
    marginLeft: 2,
    marginBottom: 10,
    textAlignVertical: 'bottom',
  },
});

export default WeeklyWeatherItem;
