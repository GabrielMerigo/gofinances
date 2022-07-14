import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { InputForm } from '../../components/InputForm'
import { Button } from "../../components/Button";
import { CategorySelectButton } from "../../components/CategorySelectButton";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles"
import * as Yup from 'yup';
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: Partial<FormData>) {
    if (!transactionType) return Alert.alert('You should select a transaction type');
    if (category.key === 'category') return Alert.alert('You should select a category')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Register</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              placeholder="Name"
              control={control}
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
            />

            <InputForm
              placeholder="Amount"
              control={control}
              name="amount"
              autoCorrect={false}
              keyboardType="numeric"
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

          <Button
            onPress={handleSubmit((form) => handleRegister(form))}
            title="Submit"
          />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            catergory={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}