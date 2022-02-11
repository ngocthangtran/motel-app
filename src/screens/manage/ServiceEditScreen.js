import React from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { Alert, StyleSheet, Text } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import {
  Form,
  FormMaskedInput,
  FormPicker,
  FormSubmitButton,
  FormTextInput,
} from '../../components/form';
import FEE_BASE_ON from '../../constants/feeBaseOn';
import SERVICE_ICONS from '../../constants/serviceIcons';
import * as Yup from 'yup';
import { createService, updateService } from '../../store/slices/serviceSlice';
import { unMask } from 'react-native-mask-text';
import PickerServiceIcon from '../../components/PickerServiceIcon';
import { useRoute, useNavigation } from '@react-navigation/core';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).required(),
  feeBasedOn: Yup.mixed().nullable(false).required(),
  // unit: Yup.string().when('feeBasedOn', {
  //   is: fbo => {
  //     return fbo && fbo.unit === null;
  //   },
  //   then: Yup.string().min(1).max(10).required(),
  // }),
  icon: Yup.string().required(),
});

function ServiceEditScreen(props) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.service);
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const RenderUnitInput = () => {
    const {
      formState: { dirtyFields, isDirty },
    } = useFormContext();

    const basedOn = useWatch({ name: 'feeBasedOn' });
    if ((basedOn && basedOn.unit === null) || (!dirtyFields.feeBasedOn && item?.unit))
      return (
        <FormTextInput
          name='unit'
          required
          label='Nhập đơn vị'
          defaultValue={item ? item.unit : ''}
        />
      );
    else return null;
  };
  const handleSubmit = (values, e) => {
    const { feeBasedOn, name, price, unit, icon } = values;
    const service = {
      name,
      price: unMask(price),
      feeBaseOnsId: feeBasedOn.fee_base_on_id,
      unit: feeBasedOn.unit ? feeBasedOn.unit.vi : unit,
      icon,
    };
    if (item) {
      service.serviceId = item.serviceId;
      dispatch(updateService({ service })).unwrap()
        .then(() => {
          Alert.alert("Thông báo", "Dữ liệu đã được lưu lại.");
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert("Thông báo", "Có lỗi xảy ra! thử lại sau.");
          navigation.goBack();
        });
    } else {
      dispatch(createService({ service }))
        .unwrap()
        .then(() => {
          Alert.alert("Thông báo", "Dịch vụ đã được lưu lại.");
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert("Lỗi", "Không thể tạo dịch vụ thử lại sau")
          navigation.goBack();
        });
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <Surface style={styles.container}>
      <AppBar title='Thêm dịch vụ' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        <Form validationSchema={validationSchema}>
          <FormTextInput
            name='name'
            required
            label='Tên dịch vụ'
            placeholder='Nhập tên dịch vụ'
            defaultValue={item ? item.name : ''}
          />
          <FormMaskedInput
            name='price'
            label='Phí dịch vụ'
            defaultValue={item ? item.price : '0'}
          />
          <FormPicker
            name='feeBasedOn'
            required
            defaultValue={
              item ? FEE_BASE_ON.find(fbo => fbo.fee_base_on_id === item.fee_base_ons_id) : null
            }
            label='Dựa trên'
            placeholder='Chọn cách thu phí'
            items={FEE_BASE_ON}
          />
          <RenderUnitInput />
          <FormPicker
            required
            name='icon'
            label='Icon đại diện'
            placeholder='Chọn icon'
            items={SERVICE_ICONS}
            defaultValue={item ? item.icon : null}
            PickerItemComponent={PickerServiceIcon}
            numColumns={3}
          />
          <Text>{error}</Text>
          <FormSubmitButton
            title={item ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {item && (
            <Button mode='text' color='#ff3648'>
              Xóa dịch vụ
            </Button>
          )}
        </Form>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 18,
  },
});

export default React.memo(ServiceEditScreen);
