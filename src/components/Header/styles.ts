import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity  } from 'react-native'

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${theme.colors.primary};
    justify-content: center;
    align-items: center;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 60px;
  `}
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.regular};
  `}
`;

export const UserName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.bold};
  `}
`;

export const Icon = styled<any>(Feather)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${RFValue(24)}px;
  `}
`;

export const LogoutButton = styled(TouchableOpacity)<any>``;