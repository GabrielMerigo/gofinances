import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import * as S from "./styles"

export function Register() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Register</S.Title>
      </S.Header>


      <S.Form>
        <S.Fields>
          <Input
            placeholder="Name"
          />
          <Input
            placeholder="Price"
          />
        </S.Fields>

        <Button title="Submit" />
      </S.Form>
    </S.Container>
  );
}