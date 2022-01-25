import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBillSvInfo } from '../../api/billing';
import { AppBar } from '../../components';
import { Form, FormDateTimePicker, FormPicker } from '../../components/form';
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
    const { billSvInfo, loading } = useSelector(state => state.billingSv);

    useEffect(() => {
      if (room != null) {
        dispatch(getBillSvInfo({ roomId: room.roomId, date: new Date() }));
        // const getData = async () => {
        //   const data = await fetchBillSvInfo(room.roomId, new Date())
        //   setBillSvInfo(data)
        // }
        // getData()
      }
    }, [room]);
    return <Text>{JSON.stringify(billSvInfo)}</Text>;
  };

  return (
    <View style={styles.container}>
      <AppBar title='Tạo hóa đơn' />
      <View style={styles.contentContainer}>
        <Form>
          <Chip icon='information-outline'>Thông tin</Chip>
          <FormDateTimePicker name='date' mode='date' label='Ngày tạo hóa đơn' />
          <FormPicker
            items={mapToFormPickerItems()}
            name='room'
            label='Phòng'
            placeholder='Chọn phòng'
          />
          <Chip icon='information-outline'>Dịch vụ</Chip>
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
});

export default React.memo(BillEditScreen);
