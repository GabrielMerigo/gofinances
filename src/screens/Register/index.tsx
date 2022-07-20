import React, { useState, useEffect } from "react";

import { InputForm } from '../../components/InputForm'
import { Button } from "../../components/Button";
import { CategorySelectButton } from "../../components/CategorySelectButton";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from "./styles"
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

type FormData = {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Name is required'),
  amount: Yup
    .number()
    .typeError('The amount cannot be a number')
    .positive('The amount cannot negative')
    .required(' The amount is required')
})

export function Register() {
  const collectionKey = '@gofinances:transactions';
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: Partial<FormData>) {
    if (!transactionType) return Alert.alert('You should select a transaction type');
    if (category.key === 'category') return Alert.alert('You should select a category')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const currentTransactions = data ? JSON.parse(data) : [];
      const transactions = [
        ...currentTransactions,
        newTransaction
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(transactions))
      setTransactionType('');
      useState({
        key: 'category',
        name: 'Categoria'
      });
      reset()
      navigate("List" as never, {} as never);
    } catch (error) {
      console.error(error);
      Alert.alert('Ops... something went wrong')
    }
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
              error={(errors?.amount?.message as any)}
              control={control}
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
            />

            <InputForm
              error={(errors?.amount?.message as any)}
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