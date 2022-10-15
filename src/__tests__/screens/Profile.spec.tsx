import React from "react";
import { render, screen }  from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('<Profile />', () => {
  it('should render user input name', () => {
    render(<Profile />);

    const inputName = screen.getByPlaceholderText('Nome');
    expect(inputName).toBeTruthy();
  });

  it('should show values of name and surname', () => {
    render(<Profile />);

    const inputName = screen.getByTestId('input-name');
    const inputSurname = screen.getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Gabriel');
    expect(inputSurname.props.value).toEqual('Merigo');
  })

  it('should render correctly', () => {
    render(<Profile />);

    const textTitle = screen.getByTestId('text-title');
    expect(textTitle.props.children).toContain('Perfil');
  });
})