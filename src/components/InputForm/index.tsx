import React from "react";
import * as S from './styles';

import { Input } from '../Input';
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {!!error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}