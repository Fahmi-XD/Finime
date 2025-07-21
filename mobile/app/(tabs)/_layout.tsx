import { Tabs } from "expo-router";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

import HeaderComponent from "@/components/Header";

import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <HeaderComponent />
      <Tabs screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0
        },
      }}>
        <Tabs.Screen name="index" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => <Feather name="home" size={27} color={color} /> }} />
        <Tabs.Screen name="anime" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => <MaterialIcons name="live-tv" size={27} color={color} /> }} />
        <Tabs.Screen name="searchPlaceholder" options={{ headerShown: false, tabBarShowLabel: false, tabBarButton: (props) => (
          <Pressable
              accessibilityRole={props.accessibilityRole}
              accessibilityState={props.accessibilityState}
              accessibilityLabel={props.accessibilityLabel}
              onPress={() => {
                router.push("/demo");
              }}
              style={styles.customTabButton}
            >
              <MaterialIcons name="search" size={27} style={{ backgroundColor: "red", borderRadius: 50, padding: 5 }} color={props?.accessibilityState?.selected ? "purple" : "white"} />
            </Pressable>
          ) }} />
        <Tabs.Screen name="manga" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => <Feather name="book-open" size={27} color={color} /> }} />
        <Tabs.Screen name="aboutPlaceholder" options={{ headerShown: false, tabBarShowLabel: false, tabBarButton: (props) => (
          <Pressable
              accessibilityRole={props.accessibilityRole}
              accessibilityState={props.accessibilityState}
              accessibilityLabel={props.accessibilityLabel}
              onPress={() => {
                router.push("/about");
              }}
              style={styles.customTabButton}
            >
              <Feather name="info" size={27} style={{ fontStyle: "normal", marginBottom: 10 }} color={props?.accessibilityState?.selected ? "purple" : "rgba(255, 255, 255, 0.6)"} />
            </Pressable>
          ) }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  customTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});