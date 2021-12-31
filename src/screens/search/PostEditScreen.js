import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, HelperText, Surface, useTheme } from 'react-native-paper';
import { AfterInteractions, Gap } from '../../components/common';
import { useNavigation } from '@react-navigation/core';
import {
  Form,
  FormImagePicker,
  FormLocationPicker,
  FormMaskedInput,
  FormRow,
  FormSubmitButton,
  FormTextInput,
  FormToggleField,
  FormUtilitiesPicker,
} from '../../components/form';

import * as Yup from 'yup';
import FormAddressPicker from '../../components/form/FormAddressPicker';
import { ROOM_TYPES } from '../../constants/form';
import { create as createPost } from '../../store/slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  images: Yup.array().min(3).required(),
  title: Yup.string().min(10).required(),
  price: Yup.string().min(0).required(),
  area: Yup.number().min(10).required(),
  deposit: Yup.number(),
  waterCost: Yup.number(),
  electricityCost: Yup.number().required(),
  phone: Yup.string()
    .matches(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    .required(),
  province: Yup.mixed().required(),
  district: Yup.mixed().required(),
  ward: Yup.mixed().required(),
  address: Yup.string().min(10).required(),
  location: {
    latitude: 16.684660373298495,
    longitude: 107.09448420321938,
  },
  description: '',
});

function PostEditScreen(props) {
  const navigation = useNavigation();
  const { loading, error } = useSelector(state => state.post);
  // console.log(error + 'asdf');
  const dispatch = useDispatch();

  const handleBack = () => navigation.goBack();
  const handleSubmit = values => {
    dispatch(createPost({ post: values }));
  };
  const { colors } = useTheme();

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title='Bài đăng mới' />
      </Appbar.Header>
      <Surface style={styles.container}>
        <AfterInteractions>
          {/* <Form validationSchema={validationSchema}> */}
          <Form>
            <FormImagePicker name='images' label='Chọn ảnh' />
            <FormToggleField
              name='postType'
              items={[
                { title: 'Cho thuê', value: 'FOR_RENT' },
                { title: 'Ở ghép', value: 'FOR_SHARE' },
              ]}
              titleField='title'
              valueField='value'
              label='Loại bài đăng'
            />
            <FormToggleField
              name='roomType'
              items={ROOM_TYPES}
              titleField='name'
              valueField='roomTypeId'
              label='Loại phòng'
            />
            <FormTextInput
              name='title'
              label='Tiêu đề bài viết'
              placeholder='Nhập tiêu đề bài viết'
            />
            <FormMaskedInput name='price' label='Giá' unit='đ' />
            <FormRow>
              <FormMaskedInput name='area' label='Diện tích' unit='m²' />
              <Gap />
              <FormMaskedInput name='deposit' label='Đặt cọc' unit='đ' />
            </FormRow>
            <FormRow>
              <FormMaskedInput name='waterCost' label='Giá nước' unit='đ' />
              <Gap />
              <FormMaskedInput name='electricityCost' label='Giá điện' unit='đ' />
            </FormRow>
            <FormTextInput
              name='phone'
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              keyboardType='numeric'
            />
            <FormUtilitiesPicker name='utils' label='Tiện ích' />
            <FormAddressPicker />
            <FormTextInput
              name='address'
              label='Địa chỉ'
              numberOfLines={2}
              placeholder='Tên đường, số nhà, hẻm,...'
            />
            <FormTextInput
              name='description'
              label='Mô tả'
              numberOfLines={2}
              multiline
              placeholder='Mô tả chi tiết'
            />
            <FormLocationPicker
              name='location'
              label='Chọn vị trí'
              defaultValue={{
                latitude: 16.684660373298495,
                longitude: 107.09448420321938,
              }}
            />
            <HelperText type='error'>{error}</HelperText>
            <FormSubmitButton title='Đăng tin' onSubmit={handleSubmit} loading={loading} />
          </Form>
        </AfterInteractions>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 6,
  },
});

export default React.memo(PostEditScreen);
