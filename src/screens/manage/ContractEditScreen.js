import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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

  const RenderServiceStartValues = () => {
    const {
      formState: { dirtyFields, isDirty },
    } = useFormContext();
    const services = useWatch({ name: 'services' });
    if (Array.isArray(services))
      return (
        <>
          {services.map(s => {
            if (s.fee_base_ons_id === '8b0871c8-5f03-4507-997f-c2008e67937d')
              return (
                <FormMaskedInput
                  key={s.serviceId}
                  name={`${s.serviceId}_startValue`}
                  defaultValue='1'
                  label={`Chỉ số ${s.name} bắt đầu`}
                  unit={s.unit}
                />
              );
          })}
        </>
      );
    return null;
  };

  const handleSubmit = values => {
    const contract = contractCreateMapper(values, room.roomId);
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
          <FormDateTimePicker name='endAt' label='Ngày kết thúc' mode='date' />
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
          <FormUtilsPicker
            items={apServices}
            defaultValue={[]}
            name='services'
            label='Dịch vụ phòng'
          />
          <RenderServiceStartValues />
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
