import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { Navigator, Screen } = createBottomTabNavigator();
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Text } from "react-native";
import theme from "../global/theme/theme";
import * as S from './styles'
import { RFValue } from "react-native-responsive-fontsize";

export function AppRoutes() {
  return (
    <Navigator>
      <Screen options={{
        tabBarLabel: ({ focused }) =>
          <Text style={{
            color: focused ? theme.colors.secondary : theme.colors.text_dark,
            fontFamily: theme.fonts.regular,
            fontSize: 14
          }}>Dashboard</Text>,
        tabBarIcon: ({ focused, size }) => (
          <S.Icon name="arrow-up-circle" color={theme.colors.secondary} />
        )
      }} name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
      <Screen name="Resumo" component={Dashboard} />
    </Navigator>
  )
}