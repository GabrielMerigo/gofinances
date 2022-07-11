import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";

import * as S from "./styles"

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

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
          <S.TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </S.TransactionTypes>
        </S.Fields>

        <Button title="Submit" />
      </S.Form>
    </S.Container>
  );
}