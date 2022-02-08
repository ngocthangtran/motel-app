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
import { getAnApatment, reloadApartment } from '../../store/slices/apartment/get';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SERVICE_EDIT_SCREEN } from '../../constants/navigation';

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
  const apartment = useRoute().params;
  const navigation = useNavigation();
  const { services: apartmentServices } = useSelector(state => state.service);
  const { loading } = useSelector(state => state.apartment.create);
  const { apartmentDetails } = useSelector(state => state.apartment.get);

  useEffect(() => {
    if (apartmentServices.length === 0) dispatch(getServices());
    if (!apartment) return
    dispatch(getAnApatment({ buildingId: apartment.buildingId }))
  }, []);

  const handleSubmit = async values => {
    const apartment = apartmentCreateMapper(values);
    const dispatchAction = await dispatch(createApartment({ apartment }));
    const result = await unwrapResult(dispatchAction);
    if (result.building) {
      const data = {
        buildingId: result.building.buildingId,
        name: result.building.name,
        address: result.building.address,
      };
      const uploadBdAction = reloadApartment({
        type: 'add',
        data,
      });
      dispatch(uploadBdAction);
      return;
    }
  };

  const handleBack = () => navigation.goBack();
  const handleAddUtil = () => navigation.navigate(SERVICE_EDIT_SCREEN);

  return (
    <Surface style={styles.container}>
      <AppBar title={apartment?"Sửa tòa nhà":'Thêm tòa nhà'} onBack={handleBack} />
      <View style={styles.contentContainer}>
        <Form validationSchema={validationSchema}>
          <FormTextInput
            name='name'
            defaultValue={apartment?.name || ''}
            label='Tên tòa nhà'
            placeholder='Nhập tên tòa nhà'
          />
          <FormAddressPicker defaultWard={apartment?.wardId} />
          <FormTextInput
            required
            name='address'
            label='Địa chỉ cụ thể'
            placeholder={apartment ? apartment.address : 'Số nhà, tên đường, hẻm'}
          />
          <FormRow>
            <FormDateTimePicker name='openTime' label='Giờ mở cửa' />
            <Gap />
            <FormDateTimePicker required name='closeTime' label='Giờ đóng cửa' />
          </FormRow>
          <FormUtilsPicker
            onAdd={handleAddUtil}
            name='services'
            label='Tiện ích tòa'
            items={apartmentServices}
            defaultValue={apartment ? apartmentDetails.service : undefined}
          />
          <FormSubmitButton title={apartment ? "Lưu tòa nhà" : 'Tạo tòa nhà'} onSubmit={handleSubmit} loading={loading} />
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
