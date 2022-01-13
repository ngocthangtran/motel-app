import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import {
  Form,
  FormDateTimePicker,
  FormMaskedInput,
  FormMultiSelect,
  FormSubmitButton,
  FormUtilsPicker,
} from '../../components/form';
import { createContractAction } from '../../store/slices/contractSlide';
import { getApartmentServices } from '../../store/slices/serviceSlice';
import { getNoContractTenants } from '../../store/slices/tenantSlice';
import { contractCreateMapper } from '../../utils/mappers';

function ContractEditScreen(props) {
  const { room, apartmentId } = useRoute().params;
  const dispatch = useDispatch();
  const { apServices } = useSelector(state => state.service);
  const { noContractTenants } = useSelector(state => state.tenant);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getApartmentServices({ apartmentId }));
    dispatch(getNoContractTenants());
  }, []);

  const handleSubmit = values => {
    const contract = contractCreateMapper(values, room.roomId);
    console.log(contract);
    dispatch(createContractAction(contract))
      .unwrap()
      .then(() => {
        alert('ok');
      })
      .catch(() => {
        alert('err');
      });
  };
  const handleBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <AppBar title='Tạo hợp đồng' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        <Form>
          <FormMaskedInput defaultValue={room.price} name='price' label='Giá thuê phòng' />
          <FormMaskedInput defaultValue={room.deposit} name='deposit' label='Tiền cọc' />
          <FormDateTimePicker name='startAt' label='Ngày bắt đầu' mode='date' />
          <FormMaskedInput
            name='paymentCycle'
            defaultValue='1'
            label='Chu kỳ thanh toán'
            unit='Tháng'
          />
          <FormMultiSelect
            placeholder='Chọn người thuê phòng'
            name='renters'
            label='Người thuê'
            items={noContractTenants}
            defaultValue={[]}
            PickerItemComponent={({ item, selected, onPress }) => {
              return (
                <Pressable onPress={onPress}>
                  <List.Item
                    title={item.name}
                    description={selected + ''}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={selected ? 'account-check-outline' : 'account-outline'}
                      />
                    )}
                  />
                </Pressable>
              );
            }}
          />
          <FormUtilsPicker items={apServices} name='services' label='Dịch vụ phòng' />
          <FormSubmitButton title='Tạo hợp đồng' onSubmit={handleSubmit} />
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
