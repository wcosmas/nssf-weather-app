import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Navigator from './src/navigator/Navigator';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
