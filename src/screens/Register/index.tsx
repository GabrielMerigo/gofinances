import React from "react";
import { Input } from "../../components/Input";

import * as S from "./styles"

export function Register() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Register</S.Title>
      </S.Header>

      <S.Form>
        <Input
          placeholder="Name"
        />
        <Input
          placeholder="Price"
        />
      </S.Form>
    </S.Container>
  );
}