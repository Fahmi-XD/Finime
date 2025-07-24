import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet } from 'react-native';
import HeaderComponent from '@/components/Header';

import WatchTodayScreen from '.';
import ComingSoonScreen from './manga';
import CategoryHorizontalList from './anime';
import EmptySearchTabScreen from './aboutPlaceholder';
import EmptyAboutTabScreen from './aboutPlaceholder';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabsParamList = {
  About: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator();
export default function TabsLayout() {
  const navigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();
  return (
    <>
      <HeaderComponent />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            height: 90,
            paddingTop: 10
          },
          sceneStyle: {
            backgroundColor: 'black',
          }
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
                onPress={() => navigation.navigate("Search")}
                style={styles.customTabButton}
              >
                <MaterialIcons
                  name="search"
                  size={30}
                  color={props.accessibilityState?.selected ? 'red' : 'rgba(255,255,255,0.6)'}
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
                onPress={() => navigation.navigate('About')}
                style={styles.customTabButton}
              >
                <Feather
                  name="info"
                  size={27}
                  style={{ marginBottom: 10 }}
                  color={props.accessibilityState?.selected ? 'red' : 'rgba(255,255,255,0.6)'}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5
  },
});