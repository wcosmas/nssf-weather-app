import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from 'native-base';

import LocationItem from '../components/LocationItem';
import { deleteLocation } from '../store/AppSlice';
import ItemSeparatorView from '../components/ItemSeperatorView';

const SavedLocations = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { locations } = useSelector((state) => state.app);

  const handleDelete = (itemIndex) => {
    dispatch(deleteLocation(itemIndex));
    toast.show({
      description: 'Location Deleted!!',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="arrow-back-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header_title}>Favourite Locations</Text>
      </View>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        ListEmptyComponent={
          <View style={styles.noLocationsWrapper}>
            <Text style={{ fontSize: 18 }}>
              You have no saved favourite locations!!
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <LocationItem
            item={item}
            index={index}
            handleDelete={handleDelete}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#4A90E2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header_title: {
    fontSize: 22,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  noLocationsWrapper: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SavedLocations;
