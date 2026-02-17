import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { typography } from '../theme/typography';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import TeamsScreen from '../screens/TeamsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const color = focused ? colors.tabBarActive : colors.tabBarInactive;
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    home: focused ? 'home' : 'home-outline',
    events: focused ? 'calendar' : 'calendar-outline',
    teams: focused ? 'people' : 'people-outline',
    schedule: focused ? 'time' : 'time-outline',
  };
  return <Ionicons name={iconMap[name] ?? 'ellipse'} size={22} color={color} />;
};

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ focused }) => <TabIcon name="events" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TeamsTab"
        component={TeamsScreen}
        options={{
          title: 'Teams',
          tabBarIcon: ({ focused }) => <TabIcon name="teams" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleScreen}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ focused }) => <TabIcon name="schedule" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBg,
    borderTopColor: 'rgba(255, 192, 16, 0.2)',
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: typography.fontFamily.body,
  },
});
