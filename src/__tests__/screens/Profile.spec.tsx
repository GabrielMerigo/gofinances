import React from "react";
import { render, screen }  from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('<Profile />', () => {
  it('should render user input name', () => {
    render(<Profile />);

    const inputName = screen.getByPlaceholderText('Nome');
    expect(inputName).toBeTruthy();
  });
})