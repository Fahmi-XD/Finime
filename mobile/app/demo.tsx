// App.tsx
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import { 
  createNativeStackNavigator,
  NativeStackNavigationOptions 
} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//
// 1) Buat dulu Stack Navigator dengan animasi custom
//
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Detail (Zoom In)"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Detail Screen</Text>
    </View>
  );
}

// opsi animasi untuk native-stack
const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  // animation: 'fade_from_bottom',    // fade in dari bawah
  // animation: 'slide_from_right',    // slide dari kanan
  animation: 'slide_from_bottom',   // modal slide up
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

//
// 2) Tab Navigator yang men‐nest HomeStack
//
function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Home berisi Stack dengan animasi */}
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});
