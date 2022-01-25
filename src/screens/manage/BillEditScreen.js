import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { Form, FormDateTimePicker, FormPicker } from '../../components/form';
import { getBillSvInfo, getRoomsWithoutBill } from '../../store/slices/billingSlice';

function BillEditScreen(props) {
  const dispatch = useDispatch();
  const { rooms, loading, billSvInfo } = useSelector(state => state.billing);
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
    useEffect(() => {
      if (room != null) {
        dispatch(getBillSvInfo({ roomId: room.roomId, date: new Date() }));
        console.log('ok');
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
