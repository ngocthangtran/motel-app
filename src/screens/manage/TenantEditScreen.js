import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { AppBar } from '../../components';
import { Form, FormDateTimePicker, FormSubmitButton, FormTextInput } from '../../components/form';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { tenantCreateMapper } from '../../utils/mappers';
import { createTenant, uploadTenant } from '../../store/slices/tenantSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  phone: Yup.string()
    .matches(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/)
    .required(),
  birthday: Yup.mixed().required(),
  idCode: Yup.string().min(9).max(9),
  issuedOn: Yup.mixed().required(),
});

function TenantEditScreen(props) {
  const { loading } = useSelector(state => state.tenant);
  const dispatch = useDispatch();
  const handleSubmit = values => {
    const tenant = tenantCreateMapper(values);
    dispatch(createTenant({ tenant }))
      .unwrap()
      .then((res) => {
        console.log(typeof (res))
        dispatch(uploadTenant({
          type: "add",
          data: res
        }))
        alert('ok');
      })
      .catch((err) => {
        console.log(err)
        alert('error');
      });
  };
  return (
    <View style={styles.container}>
      <AppBar title='Thêm người thuê' />
      <Surface style={styles.contentContainer}>
        <Form validationSchema={validationSchema}>
          <FormTextInput name='name' label='Họ tên' placeholder='Nguyễn Văn A' />
          <FormTextInput
            name='phone'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            keyboardType='numeric'
          />
          <FormDateTimePicker name='birthday' label='Ngày sinh' mode='date' />
          <FormTextInput
            name='idCode'
            label='Số CMND / CCCD'
            placeholder=''
            keyboardType='numeric'
          />
          <FormDateTimePicker name='issuedOn' label='Ngày cấp' mode='date' />
          <FormSubmitButton title='Tạo người thuê' onSubmit={handleSubmit} />
        </Form>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(TenantEditScreen);
