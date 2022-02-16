import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { Gap } from '../../components/common';
import {
  Form,
  FormHiddenField,
  FormMaskedInput,
  FormPicker,
  FormRow,
  FormSubmitButton,
} from '../../components/form';
import { createBill, getRoomsWithoutBill } from '../../store/slices/billingSlice';
import { getBillSvInfo } from '../../store/slices/billingSvSlide';
import { billCreateMapper } from '../../utils/mappers';

function BillEditScreen(props) {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector(state => state.billing);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getRoomsWithoutBill(new Date()));
  }, []);

  const mapToFormPickerItems = () => {
    if (!rooms) return [];
    return rooms.notExitBill.reduce((p, c) => {
      const rooms = c.room.map(r => {
        return { ...r, name: `${r.name} - ${c.name}` };
      });
      return p.concat(rooms);
    }, []);
  };

  const RenderServices = () => {
    const room = useWatch({ name: 'room' });
    const { billSvInfo, loading } = useSelector(state => state.billingSv);

    useEffect(() => {
      if (room != null) {
        dispatch(getBillSvInfo({ roomId: room.roomId, date: new Date() }));
      }
    }, [room]);
    if (!room || !billSvInfo) return null;
    return (
      loading ? <ActivityIndicator size="large" color="#0000ff" />
        : <>
          <FormHiddenField name='info' defaultValue={billSvInfo} />
          < Chip icon='information-outline' style={styles.chip} >
            Chi tiết
          </Chip >
          <FormMaskedInput disabled label='Số ngày' defaultValue={billSvInfo?.diffDays} unit='Ngày' />
          <FormMaskedInput disabled label='Số tiền' defaultValue={billSvInfo?.rent} unit='VNĐ' />
          {
            billSvInfo?.service.map(s => {
              switch (s.feeBaseOnId) {
                case '8b0871c8-5f03-4507-997f-c2008e67937d':
                  return (
                    <View key={s.serviceId}>
                      <Chip icon={s.icon} style={styles.chip}>
                        {s.name}
                      </Chip>
                      <FormRow>
                        <FormMaskedInput
                          name={s.serviceId + '_last'}
                          label='Chỉ sốt bắt đầu'
                          defaultValue={s?.lastValue}
                          unit={s.unit}
                        />
                        <Gap />
                        <FormMaskedInput
                          name={s.serviceId + '_curr'}
                          label='Chỉ sốt kết thúc'
                          defaultValue={s?.currentValue}
                          unit={s.unit}
                        />
                      </FormRow>
                    </View>
                  );
                case 'd6122b9b-3718-4e05-bb5d-406e8efe7875': {
                  return (
                    <FormMaskedInput
                      disabled
                      key={s.serviceId}
                      defaultValue={s.price}
                      label={s.name}
                      unit={s.unit}
                    />
                  );
                }
                case '6c368419-c07c-4b72-b8a0-a2b5c96ee030': {
                  return (
                    <View key={s.serviceId}>
                      <Chip icon={s.icon} style={styles.chip}>
                        {s.name}
                      </Chip>
                      <FormRow>
                        <FormMaskedInput
                          disabled
                          name={s.serviceId}
                          key={s.serviceId + '_'}
                          label='Giá'
                        />
                        <Gap />
                        <FormMaskedInput
                          key={s.serviceId}
                          name={s.serviceId + '_rc'}
                          label={'Số người sử dụng'}
                          unit={s.unit}
                          defaultValue={billSvInfo.renterCount}
                        />
                      </FormRow>
                    </View>
                  );
                }
              }
            })
          }
          <FormSubmitButton title='Tạo hóa đơn' onSubmit={handleSubmit} />
        </>
    );
  };

  const handleSubmit = values => {
    const data = billCreateMapper(values);
    dispatch(createBill(data))
      .unwrap()
      .then(() => {
        Alert.alert("Thông báo", "Tạo hóa đơn thành công")
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Lỗi", "Lỗi tạo hóa đơn");
      });
  };
  return (
    <View style={styles.container}>
      <AppBar title='Tạo hóa đơn' onBack={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <Form>
          <Chip icon='information-outline' style={styles.chip}>
            Thông tin
          </Chip>
          <FormPicker
            items={mapToFormPickerItems()}
            name='room'
            label='Phòng'
            placeholder='Chọn phòng'
          />
          <RenderServices />
        </Form>
      </View>
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
  chip: {
    marginBottom: 12,
  }, loading: {
    // backgroundColor: "black",
    width: "100%",
    height: 100
  }
});

export default React.memo(BillEditScreen);
