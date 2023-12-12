import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Itsy from './screens/itsy';
import ItsyPlus from './screens/ItsyPlus';
const Stack = createNativeStackNavigator();
function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false ,customAnimationOnGesture:true,animation:"slide_from_right"}} name="Itsy" component={Itsy} />
        <Stack.Screen options={{ headerShown: false ,customAnimationOnGesture:true,animation:"slide_from_right"}} name="Plus" component={ItsyPlus} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}


export default App;

