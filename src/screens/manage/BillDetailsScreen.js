import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Chip, List, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { getBillDetails } from '../../store/slices/billingSlice';
import { deleteBillService, paidBillService } from '../../store/slices/billingSvSlide';
import { vndFormatter } from '../../utils/common';

function BillDetailsScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { billId } = useRoute().params;
  const { loading, billDetails } = useSelector(state => state.billing);

  useEffect(() => {
    dispatch(getBillDetails(billId));
  }, []);

  const deleteBill = () => {
    dispatch(deleteBillService({ billId })).unwrap()
      .then(() => {
        Alert.alert("Thông báo", "Hóa đơn đã được xóa");
        navigation.goBack()
      })
      .catch(() => Alert.alert("Thông báo", "Hóa đơn không được xóa thử lại sau"))
  }

  const paidBill = () => {
    dispatch(paidBillService({ billId })).unwrap()
      .then(() => {
        Alert.alert("Thông báo", "Hóa đơn đã được thanh toán");
        navigation.goBack()
      })
      .catch(() => Alert.alert("Thông báo", "Hóa đơn không được thanh toán thử lại sau"))
  }

  const handleBack = () => navigation.goBack();
  return (
    <Surface style={styles.container}>
      <AppBar title='Chi tiết hóa đơn' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        {billDetails && (
          <>
            <Chip icon='information-outline'>Thông tin chung</Chip>
            <List.Item
              left={props => <List.Icon {...props} icon={'office-building'} />}
              title='Tên tòa nhà'
              description={billDetails.nameBuilding}
            />
            <List.Item
              left={props => <List.Icon {...props} icon={'microsoft-windows'} />}
              title='Tên phòng'
              description={billDetails.nameRoom}
            />
            <List.Item
              left={props => <List.Icon {...props} icon={'clock-start'} />}
              title='Ngày bắt đầu'
              description={billDetails.startDay}
            />
            <List.Item
              left={props => <List.Icon {...props} icon={'clock-end'} />}
              title='Ngày kết thúc'
              description={billDetails.endDay}
            />
            <Chip icon='bell-check-outline'>Dịch vụ</Chip>

            {billDetails.services.map(s => {
              return (
                <List.Item
                  key={s.nameService}
                  title={s.nameService}
                  description={vndFormatter(s.price)}
                  left={props => <List.Icon {...props} icon={s.icon || 'room-service-outline'} />}
                />
              );
            })}
            <Button color='tomato' onPress={deleteBill}>Xóa hóa đơn</Button>
            {!billDetails.status && <Button mode='contained' onPress={paidBill}>Thanh toán hóa đơn</Button>}
          </>
        )}
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
    padding: 12,
  },
});

export default React.memo(BillDetailsScreen);
