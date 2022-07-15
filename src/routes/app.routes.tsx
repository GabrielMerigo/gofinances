import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Text } from "react-native";
import theme from "../global/theme/theme";
import * as S from './styles'

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator defaultScreenOptions={{
      tabBarBadgeStyle: {
        backgroundColor: 'red'
      }
    }}>
      <Screen
        options={{
          tabBarLabel: ({ focused, position }) =>
            <Text style={{
              color: focused ? theme.colors.secondary : theme.colors.text_dark,
              fontFamily: theme.fonts.regular,
              fontSize: 14
            }}>Dashboard</Text>,
          tabBarIcon: ({ focused }) => (
            <S.Icon focused={focused} name="list" color={theme.colors.secondary} />
          )
        }}
        name="List"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) =>
            <Text style={{
              color: focused ? theme.colors.secondary : theme.colors.text_dark,
              fontFamily: theme.fonts.regular,
              fontSize: 14
            }}>Register</Text>,
          tabBarIcon: ({ focused }: any) => (
            <S.Icon focused={focused} name="dollar-sign" color={theme.colors.secondary} />
          )
        }}
        name="Register"
        component={Register}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }) =>
            <Text style={{
              color: focused ? theme.colors.secondary : theme.colors.text_dark,
              fontFamily: theme.fonts.regular,
              fontSize: 14
            }}>Summary</Text>,
          tabBarIcon: ({ focused }) => (
            <S.Icon focused={focused} name="pie-chart" color={theme.colors.secondary} />
          )
        }}
        name="Summary"
        component={Register}
      />
    </Navigator>
  )
}