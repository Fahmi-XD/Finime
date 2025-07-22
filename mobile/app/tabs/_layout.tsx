// import { Tabs } from "expo-router";

// export default function TabLayout() {
//   return (
//     <Tabs screenOptions={{
//       headerShown: false,
//     }}>
//       <Tab.Screen
//         name="index"
//         options={{
//           title: "Home",
//         }}
//       />
//       <Tab.Screen
//         name="manga"
//         options={{
//           title: "Explore",
//         }}
//       />
//     </Tabs>
//   );
// }





import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import HeaderComponent from '@/components/Header';

import WatchTodayScreen from '.';
import ComingSoonScreen from './manga';
import CategoryHorizontalList from './anime';
import EmptySearchTabScreen from './aboutPlaceholder';
import EmptyAboutTabScreen from './aboutPlaceholder';

const Tab = createBottomTabNavigator();
export default function TabsLayout() {
  return (
    <>
      <HeaderComponent />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
        }}
      >
        
        <Tab.Screen
          name="index"
          component={WatchTodayScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <Feather name="home" size={27} color={color} />,
          }}
        />

        <Tab.Screen
          name="anime"
          component={CategoryHorizontalList}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <MaterialIcons name="live-tv" size={27} color={color} />,
          }}
        />

        <Tab.Screen
          name="searchPlaceholder"
          component={EmptySearchTabScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <Pressable
                accessibilityRole={props.accessibilityRole}
                accessibilityState={props.accessibilityState}
                accessibilityLabel={props.accessibilityLabel}
                onPress={() => router.push('/search')}
                style={styles.customTabButton}
              >
                <MaterialIcons
                  name="search"
                  size={27}
                  style={{ backgroundColor: 'red', borderRadius: 50, padding: 5, width: 40, height: 40 }}
                  color={props.accessibilityState?.selected ? 'purple' : 'white'}
                />
              </Pressable>
            ),
          }}
        />

        <Tab.Screen
          name="manga"
          component={ComingSoonScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <Feather name="book-open" size={27} color={color} />,
          }}
        />

        <Tab.Screen
          name="aboutPlaceholder"
          component={EmptyAboutTabScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <Pressable
                accessibilityRole={props.accessibilityRole}
                accessibilityState={props.accessibilityState}
                accessibilityLabel={props.accessibilityLabel}
                onPress={() => router.push('/about')}
                style={styles.customTabButton}
              >
                <Feather
                  name="info"
                  size={27}
                  style={{ marginBottom: 10 }}
                  color={props.accessibilityState?.selected ? 'purple' : 'rgba(255,255,255,0.6)'}
                />
              </Pressable>
            ),
          }}
        />
      </Tab.Navigator>
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