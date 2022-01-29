import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';
import { Chip, List, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBillSvInfo } from '../../api/billing';
import { AppBar } from '../../components';
import { Gap } from '../../components/common';
import {
  Form,
  FormDateTimePicker,
  FormMaskedInput,
  FormPicker,
  FormRow,
  FormSubmitButton,
} from '../../components/form';
import { getRoomsWithoutBill } from '../../store/slices/billingSlice';
import { getBillSvInfo } from '../../store/slices/billingSvSlide';

function BillEditScreen(props) {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector(state => state.billing);
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
    const { colors } = useTheme();
    const { billSvInfo, loading } = useSelector(state => state.billingSv);

    useEffect(() => {
      if (room != null) {
        dispatch(getBillSvInfo({ roomId: room.roomId, date: new Date() }));
      }
    }, [room]);
    if (!room) return null;
    return (
      <>
        <Chip icon='information-outline' style={styles.chip}>
          Chi tiết
        </Chip>
        <FormMaskedInput
          disabled
          name='diff'
          label='Số ngày'
          defaultValue={billSvInfo?.diffDays}
          unit='Ngày'
        />
        <FormMaskedInput
          disabled
          name='rent'
          label='Số tiền'
          defaultValue={billSvInfo?.rent}
          unit='VNĐ'
        />
        {billSvInfo?.service.map(s => {
          switch (s.feeBaseOnId) {
            case '8b0871c8-5f03-4507-997f-c2008e67937d':
              return (
                <View key={s.serviceId}>
                  <List.Item
                    title={s.name}
                    style={{ marginBottom: 12 }}
                    titleStyle={{ fontWeight: 'bold', color: colors.primary }}
                    left={props => <List.Icon {...props} icon={s.icon} color={colors.primary} />}
                  />
                  <FormRow>
                    <FormMaskedInput
                      name={s.name + '_last'}
                      label='Chỉ sốt bắt đầu'
                      defaultValue={s.lastValue}
                      unit={s.unit}
                    />
                    <Gap />
                    <FormMaskedInput
                      name={s.name + '_curr'}
                      label='Chỉ sốt kết thúc'
                      defaultValue={s.currentValue}
                      unit={s.unit}
                    />
                  </FormRow>
                </View>
              );
            case 'd6122b9b-3718-4e05-bb5d-406e8efe7875': {
              return (
                <FormMaskedInput
                  key={s.serviceId}
                  defaultValue={s.price}
                  label={s.name}
                  unit={s.unit}
                />
              );
            }
            case '6c368419-c07c-4b72-b8a0-a2b5c96ee030': {
              return (
                <FormMaskedInput
                  key={s.serviceId}
                  label={s.name}
                  unit={`x${billSvInfo.renterCount} ${s.unit}`}
                />
              );
            }
            default:
              break;
          }
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <AppBar title='Tạo hóa đơn' />
      <View style={styles.contentContainer}>
        <Form>
          <Chip icon='information-outline' style={styles.chip}>
            Thông tin
          </Chip>
          <FormDateTimePicker name='date' mode='date' label='Ngày tạo hóa đơn' />
          <FormPicker
            items={mapToFormPickerItems()}
            name='room'
            label='Phòng'
            placeholder='Chọn phòng'
          />
          <RenderServices />
          <FormSubmitButton title='Tạo hóa đơn' />
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
  },
});

export default React.memo(BillEditScreen);
