import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Text } from "react-native";
import theme from "../global/theme/theme";
import { IconTabBottom } from "../components/IconTabBottom";
import { LabelTabBottom } from "../components/LabelTabBottom";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Dashboard" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="list" />
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Register" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="dollar-sign" />
        }}
        name="Register"
        component={Register}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Summary" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="pie-chart" />
        }}
        name="Summary"
        component={Register}
      />
    </Navigator>
  )
}