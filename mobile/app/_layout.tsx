import React from 'react';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import SearchScreen from './search';
import AboutScreen  from './about';

import TabsLayout from './tabs/_layout';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="RootTabs"
      screenOptions={{
        ...TransitionPresets.ScaleFromCenterAndroid,
        headerShown: false,
        cardStyle: {
          backgroundColor: "black"
        }
      }}
    >
      <Stack.Screen
        name="RootTabs"
        component={TabsLayout}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="About"  component={AboutScreen} />
    </Stack.Navigator>
  );
}