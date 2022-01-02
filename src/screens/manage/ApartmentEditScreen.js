import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { ActivityIndicator, Surface } from 'react-native-paper';
import {
  Form,
  FormDateTimePicker,
  FormRow,
  FormSubmitButton,
  FormTextInput,
  FormUtilsPicker,
} from '../../components/form';
import FormAddressPicker from '../../components/form/FormAddressPicker';
import { Gap } from '../../components/common';
import * as Yup from 'yup';
import AppBar from '../../components/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../store/slices/serviceSlice';
import { createApartment } from '../../store/slices/apartment';
import { apartmentCreateMapper } from '../../utils/mappers';
import { unwrapResult } from '@reduxjs/toolkit';
import { reloadApartment } from '../../store/slices/apartment/get';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(6).required(),
  province: Yup.mixed().required(),
  district: Yup.mixed().required(),
  ward: Yup.mixed().required(),
  address: Yup.string().min(10).required(),
  closeTime: Yup.date().required(),
});

function ApartmentEditScreen(props) {
  const dispatch = useDispatch();
  const { services: apartmentServices } = useSelector(state => state.service);
  const { loading } = useSelector(state => state.apartment.create);
  useEffect(() => {
    if (apartmentServices.length === 0) dispatch(getServices());
  }, []);

  const handleSubmit = async values => {
    const apartment = apartmentCreateMapper(values);
    const dispatchAction = await dispatch(createApartment({ apartment }))
    const result = await unwrapResult(dispatchAction);
    if (result.building) {
      const data = {
        buildingId: result.building.buildingId,
        name: result.building.name,
        address: result.building.address
      }
      const uploadBdAction = reloadApartment({
        type: "add",
        data
      });
      dispatch(uploadBdAction);
      return
    }
  };

  return (
    <Surface style={styles.container}>
      <AppBar title='Thêm tòa nhà' />
      <View style={styles.contentContainer}>
        {/* <Form> */}
        <Form validationSchema={validationSchema}>
          <FormTextInput name='name' label='Tên tòa nhà' placeholder='Nhập tên tòa nhà' />
          <FormAddressPicker />
          <FormTextInput
            required
            name='address'
            label='Địa chỉ cụ thể'
            placeholder='Số nhà, tên đường, hẻm'
          />
          <FormRow>
            <FormDateTimePicker name='openTime' label='Giờ mở cửa' />
            <Gap />
            <FormDateTimePicker required name='closeTime' label='Giờ mở cửa' />
          </FormRow>
          <FormUtilsPicker name='services' label='Tiện ích tòa' items={apartmentServices} />
          <FormSubmitButton title='Tạo tòa nhà' onSubmit={handleSubmit} loading={loading} />
        </Form>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
});

export default React.memo(ApartmentEditScreen);
