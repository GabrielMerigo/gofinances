import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import theme from "../global/theme/theme";
import { IconTabBottom } from "../components/IconTabBottom";
import { LabelTabBottom } from "../components/LabelTabBottom";
import { RFValue } from "react-native-responsive-fontsize";
import { Resume } from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      tabBarBadgeStyle: {
        height: `${RFValue(50)}`
      },
    }}>
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Dashboard" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="list" />
        }}
        name="dashboard"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Register" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="dollar-sign" />
        }}
        name="register"
        component={Register}
      />
      <Screen
        options={{
          tabBarLabel: ({ focused }: any) => <LabelTabBottom focused={focused} theme={theme} label="Summary" />,
          tabBarIcon: ({ focused }) => <IconTabBottom focused={focused} theme={theme} nameIcon="pie-chart" />
        }}
        name="summary"
        component={Resume}
      />
    </Navigator>
  )
}