import React, { useState } from "react";
import { Modal } from 'react-native'
import { Button } from "../../components/Button";
import { CategorySelectButton } from "../../components/CategorySelectButton";
import { Input } from "../../components/Input";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles"

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }


  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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
          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </S.Fields>

        <Button title="Submit" />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          catergory={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
}