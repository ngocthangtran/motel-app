import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar, HelperText, Surface, useTheme } from 'react-native-paper';
import { AfterInteractions, Gap } from '../../components/common';
import { useNavigation, useRoute } from '@react-navigation/core';
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
import { clearPostState, create as createPost, getPostDetails } from '../../store/slices/postSlice';
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
  const { loading, error, post } = useSelector(state => state.post);

  const dispatch = useDispatch();
  const postId = useRoute().params;

  const handleBack = () => {
    dispatch(clearPostState());
    navigation.goBack();
  };
  const handleSubmit = values => {
    if (!post) dispatch(createPost({ post: values }));
    else null; // handle update
  };
  const { colors } = useTheme();
  const POST_TYPES = [
    { title: 'Cho thuê', value: 'FOR_RENT' },
    { title: 'Ở ghép', value: 'FOR_SHARE' },
  ];

  useEffect(() => {
    if (postId) dispatch(getPostDetails({ postId }));
  }, []);

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={postId ? 'Chỉnh sửa bài viết' : 'Bài đăng mới'} />
      </Appbar.Header>
      <Surface style={styles.container}>
        <AfterInteractions>
          {/* <Form validationSchema={validationSchema}> */}
          {(!postId || (postId && post)) && (
            <Form>
              <FormImagePicker
                name='images'
                label='Chọn ảnh'
                defaultValue={post?.postImages.map(pi => pi.url)}
              />
              <FormToggleField
                name='postType'
                items={POST_TYPES}
                defaultValue={post?.postType}
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
                defaultValue={post?.roomTypeId}
              />
              <FormTextInput
                name='title'
                label='Tiêu đề bài viết'
                placeholder='Nhập tiêu đề bài viết'
                defaultValue={post?.title}
              />
              <FormMaskedInput name='price' label='Giá' unit='đ' defaultValue={post?.price} />
              <FormRow>
                <FormMaskedInput
                  name='area'
                  defaultValue={post?.area}
                  label='Diện tích'
                  unit='m²'
                />
                <Gap />
                <FormMaskedInput
                  name='deposit'
                  defaultValue={post?.deposit}
                  label='Đặt cọc'
                  unit='đ'
                />
              </FormRow>
              <FormRow>
                <FormMaskedInput
                  defaultValue={post?.waterCost}
                  name='waterCost'
                  label='Giá nước'
                  unit='đ'
                />
                <Gap />
                <FormMaskedInput
                  defaultValue={post?.electricityCost}
                  name='electricityCost'
                  label='Giá điện'
                  unit='đ'
                />
              </FormRow>
              <FormTextInput
                defaultValue={post?.phone}
                name='phone'
                label='Số điện thoại'
                placeholder='Nhập số điện thoại'
                keyboardType='numeric'
              />
              <FormUtilitiesPicker name='utils' label='Tiện ích' defaultValue={post?.utility} />
              <FormAddressPicker defaultWard={post?.wardId} />
              <FormTextInput
                name='address'
                defaultValue={post?.address}
                label='Địa chỉ'
                numberOfLines={2}
                placeholder='Tên đường, số nhà, hẻm,...'
              />
              <FormTextInput
                name='description'
                defaultValue={post?.description}
                label='Mô tả'
                numberOfLines={2}
                multiline
                placeholder='Mô tả chi tiết'
              />
              <FormLocationPicker
                name='location'
                label='Chọn vị trí'
                defaultValue={{
                  latitude: post ? +post.latitude : 16.684660373298495,
                  longitude: post ? +post.longitude : 107.09448420321938,
                }}
              />
              <HelperText type='error'>{error}</HelperText>
              <FormSubmitButton title='Đăng tin' onSubmit={handleSubmit} loading={loading} />
            </Form>
          )}
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
