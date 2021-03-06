import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button, FAB, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RentalItem } from '../../components';
import AppBarSearch from '../../components/AppBarSearch';
import { SafeAreaContainer } from '../../components/common';
import BottomModal from '../../components/common/BottomModal';
import { POST_DETAILS } from '../../constants/navigation';
import {
  Form,
  FormRangeSlider,
  FormRow,
  FormSubmitButton,
  FormToggleField,
} from '../../components/form';
import useDisclosure from '../../hooks/useDisclosure';
import { search } from '../../store/slices/searchSlice';
import { AfterInteractions } from '../../components/common';

function SearchScreen(props) {
  const navigation = useNavigation();
  const [isVisible, onOpen, onClose] = useDisclosure();
  const [filterVisible, setFilterVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector(state => state.search);

  const handleBackActionPress = () => navigation.goBack();
  const handleChangeText = text => {
    setKeyword(text);
    if (filterVisible) setFilterVisible(false);
  };
  const handleSubmitEditing = () => {
    dispatch(search({ keyword }));
    setFilterVisible(true);
  };

  const handleSubmit = values => {
    onClose();
    const { area, postType, price, roomType, sort } = values;
    dispatch(
      search({
        keyword,
        maxArea: area.max < 100 ? area.max : null,
        minArea: area.max < 100 ? area.min : null,
        maxPrice: price.max < 10 ? price.max * 1000000 : null,
        minPrice: price.max < 10 ? price.min * 1000000 : null,
        postType,
        roomType,
        sort,
      })
    );
  };

  const handleItemPress = item => () => navigation.navigate(POST_DETAILS, { postId: item.postId });

  return (
    <Surface style={styles.container}>
      <AppBarSearch
        onSubmitEditing={handleSubmitEditing}
        backButton
        onChangeText={handleChangeText}
        placeholder='T??m theo t??n ???????ng, s??? nh??'
        onBackActionPress={handleBackActionPress}
      />
      {loading && <ActivityIndicator animating color='red' />}
      <AfterInteractions>
        <FlatList
          style={{ flex: 1 }}
          data={posts}
          keyExtractor={item => item.postId}
          renderItem={({ item }) => (
            <RentalItem item={item} horizontal onPress={handleItemPress(item)} />
          )}
          refreshing={loading}
        />
        <Form>
          <BottomModal visible={isVisible} onClose={onClose}>
            <FormToggleField
              name='postType'
              label='Lo???i tin'
              titleField='title'
              valueField='value'
              items={[
                { title: 'T???t c???', value: '' },
                { title: 'Cho thu??', value: 'FOR_RENT' },
                { title: '??? gh??p', value: 'FOR_SHARE' },
              ]}
            />
            <FormToggleField
              name='roomType'
              label='Lo???i ph??ng'
              titleField='title'
              valueField='value'
              items={[
                { title: 'T???t c???', value: '' },
                {
                  value: '1a2769d0-f60a-4f90-8652-b98ba92cc235',
                  title: 'Ph??ng',
                },
                {
                  value: '6dd926e9-3c60-4971-b569-4810b4d345ae',
                  title: 'Nguy??n c??n',
                },
                {
                  value: 'c1a9827f-0dd1-44a6-8fe3-e18859945e0d',
                  title: 'C??n h???',
                },
                {
                  value: 'f5ae309a-aa58-4d18-8c5f-e69fdd360b46',
                  title: 'C??n h??? mini',
                },
              ]}
            />
            <FormToggleField
              name='sort'
              label='S???p x???p'
              titleField='title'
              valueField='value'
              items={[
                { title: 'M???i nh???t', value: '' },
                { title: 'Gi?? gi???m d???n', value: 'SORT_DOWN' },
                { title: 'Gi?? t??ng d???n', value: 'SORT_UP' },
              ]}
            />
            <FormRangeSlider
              name='area'
              label='Di???n t??ch'
              min={0}
              max={100}
              defaultValue={{ min: 0, max: 100 }}
              unit='m'
              useGreaterThan
            />
            <FormRangeSlider
              name='price'
              label='Kho???ng gi??'
              min={0}
              max={10}
              unit='Tri???u'
              defaultValue={{ min: 0, max: 10 }}
            />
            <FormRow>
              <Button uppercase={false}>H???y</Button>
              <FormSubmitButton title='L???c' onSubmit={handleSubmit} />
            </FormRow>
          </BottomModal>
        </Form>
      </AfterInteractions>
      {/* </SafeAreaContainer> */}
      <FAB
        icon='filter'
        style={styles.fab}
        color='#fff'
        onPress={onOpen}
        visible={filterVisible && !loading}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(SearchScreen);
