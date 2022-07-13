import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { categories } from '../../utils/categories';

import * as S from './styles';

type Category = {
  key: string;
  name: string;
}

type CategorySelectProps = {
  catergory: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  catergory,
  setCategory,
  closeSelectCategory
}: CategorySelectProps) {

  function handleCategorySelect(category: Category) {
    setCategory(category)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Category</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={catergory.key === item.key}
          >
            <S.Icon name={item.icon}></S.Icon>
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Divider />}
      />

      <S.Footer>
        <Button
          title='Select'
          onPress={closeSelectCategory}
        />
      </S.Footer>
    </S.Container>
  )
}