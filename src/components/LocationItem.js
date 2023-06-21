import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const LocationItem = ({ item, index, handleDelete }) => {
  const convertTimestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontWeight: '600' }]}>
          {item.locationName}
        </Text>
        <Text style={styles.text}>
          {convertTimestampToDate(item.timestamp)}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Text style={{ color: 'red', fontSize: 18 }}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default LocationItem;
