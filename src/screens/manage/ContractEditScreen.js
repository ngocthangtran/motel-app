import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { AppBar } from '../../components';
import {
  Form,
  FormDateTimePicker,
  FormMaskedInput,
  FormSubmitButton,
  FormTextInput,
} from '../../components/form';

function ContractEditScreen(props) {
  return (
    <View style={styles.container}>
      <AppBar title='Tạo hợp đồng' />
      <Surface style={styles.contentContainer}>
        <Form>
          <FormMaskedInput name='name' label='Giá thuê phòng' />
          <FormMaskedInput name='deposit' label='Tiền cọc' />
          <FormDateTimePicker name='startAt' label='Ngày bắt đầu' mode='date' />
          <FormMaskedInput label='Chu kỳ thanh toán' unit='Tháng' />
          <FormSubmitButton title='Tạo hợp đồng' />
        </Form>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(ContractEditScreen);
