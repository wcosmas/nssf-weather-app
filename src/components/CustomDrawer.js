import { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#0F1E45' }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={require('../../assets/nssf_logo.png')}
            style={{
              height: 70,
              width: 70,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
            }}
          >
            NSSF
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
            }}
          >
            Weather App
          </Text>
        </View>
        <View
          style={{ flex: 1, backgroundColor: '#fff', paddingTop: 15 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{ paddingVertical: 15 }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Share with friends
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
