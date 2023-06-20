import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './AppStack';

const Navigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigator;
