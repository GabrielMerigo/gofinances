import React, { useState } from "react";

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
import { Heading } from "../../components/Heading";
import useAuth from "../../hooks/auth";

const schema = Yup.object().shape({
  title: Yup
    .string()
    .required('Title is required'),
  amount: Yup
    .number()
    .typeError('The amount cannot be a number')
    .positive('The amount cannot negative')
    .required(' The amount is required')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { user } = useAuth();
  const { navigate } = useNavigation();

  const {
    control,
    formState: { errors },
    getValues,
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


  async function handleRegister() {
    const collectionKey = `@gofinances:transactions_user:${user!.id}`;
    if (!transactionType) return Alert.alert('You should select a transaction type');
    if (category.key === 'category') return Alert.alert('You should select a category')
    const { name, amount } = getValues();

    const newTransaction = {
      id: String(uuid.v4()),
      title: name,
      amount: amount,
      type: (transactionType as 'up' | 'down'),
      category: {
        name: category.name,
        icon: category.key
      },
      date: (new Date() as any)
    }

    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const currentTransactions = data ? JSON.parse(data) : [];
      const transactions = [
        ...currentTransactions,
        newTransaction
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(transactions));
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      reset();
      navigate("dashboard" as never, {} as never);
    } catch (error) {
      console.error(error);
      Alert.alert('Ops... something went wrong')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Heading children="Register" />

        <S.Form>
          <S.Fields>
            <CategorySelectButton
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
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

            <InputForm
              placeholder="Name"
              error={(errors?.amount?.message as any)}
              control={control}
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
            />

            <InputForm
              style={{ marginTop: 7 }}
              error={(errors?.amount?.message as any)}
              placeholder="Amount"
              control={control}
              name="amount"
              autoCorrect={false}
              keyboardType="numeric"
            />


          </S.Fields>

          <Button
            onPress={() => handleRegister()}
            title="Submit"
          />
        </S.Form>

        <Modal focusable visible={categoryModalOpen}>
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