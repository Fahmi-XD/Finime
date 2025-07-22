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






// import { TransitionPresets, createStackNavigator } from "@react-navigation/stack"

// import SearchScreen from "./search";
// import AboutScreen from "./about";
// import TabsLayout from "./tabs/home";

// const NativeStack = createStackNavigator();

// export default function RootLayout() {
//   return (
//     <>
//       <NativeStack.Navigator screenOptions={{
//         ...TransitionPresets.ScaleFromCenterAndroid,
//         headerShown: false,
//       }}>
//         <NativeStack.Screen
//           name="Home"
//           component={TabsLayout}
//           options={{ headerShown: false }}
//         />
//         <NativeStack.Screen name="search" component={SearchScreen} options={{ headerShown: false }} />
//         <NativeStack.Screen name="about" component={AboutScreen} options={{ headerShown: false }} />
//       </NativeStack.Navigator>
//     </>
//   );
// }
