import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Chip, List, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { Gap } from '../../components/common';
import { FormMaskedInput, FormRow } from '../../components/form';
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
            <Chip icon='bell-check-outline' style={{ marginBottom: 12 }}>Dịch vụ</Chip>
            <ScrollView>
              {billDetails.services.map((sv, i) => {
                return (
                  <View key={i}>
                    <Chip
                      style={{ marginBottom: 12 }}
                      icon={sv.icon}
                      textStyle={{ fontWeight: 'bold' }}
                    >
                      {sv.nameService}
                    </Chip>
                    <List.Item
                      title={`Thành tiền: ${vndFormatter(sv.intoMoney)}`}
                      description={`Giá dịch vụ: ${vndFormatter(sv.price)} /${sv.unit}`}
                      right={props => <List.Icon {...props} icon={sv.icon} />}
                    />
                    {
                      sv.lastValue &&
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: 'flex-end',
                          paddingRight: 10
                        }}
                      >
                        <Text >
                          Đã sử dụng: {sv.currentValue - sv.lastValue}
                        </Text>
                      </View>
                    }
                  </View>
                );
              })}
            </ScrollView>

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
