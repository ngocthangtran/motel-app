import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, Chip, List, Surface } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AppBar } from '../../components';
import { deleteContractAction, getContractDetail } from '../../store/slices/contractSlide';
import { useSelector } from 'react-redux';
import { Form, FormDateTimePicker, FormMaskedInput, FormTextInput } from '../../components/form';
import moment from 'moment';
import { vndFormatter } from '../../utils/common';

function ContractDetailsScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contractId = useRoute().params;
  const { contract } = useSelector(state => state.contract);

  useEffect(() => {
    dispatch(getContractDetail(contractId));
  }, []);

  const handleBack = () => navigation.goBack();
  const handleDelete = () => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa hợp đồng?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: () => {
          dispatch(deleteContractAction(contractId))
            .unwrap()
            .then(() => Alert.alert("Thông báo", "Hợp đồng đã xóa thành công"))
            .catch(() => Alert.alert("Lỗi", "Có lỗi xảy ra xin thử lại sau"));
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <AppBar title='Chi tiết hợp đồng' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        {contract && (
          <Form>
            <Chip style={styles.chip} icon='information-variant'>
              Thông tin
            </Chip>
            <FormTextInput
              disabled
              name='roomName'
              label='Tên phòng'
              defaultValue={contract?.roomName}
            />
            <FormDateTimePicker
              disabled
              name='startAt'
              label='Ngày bắt đầu'
              mode='date'
              defaultValue={moment(contract?.startAt, 'DD-MM-YYYY').toDate()}
            />
            <FormDateTimePicker
              disabled
              name='endAt'
              label='Ngày kết thúc'
              mode='date'
              defaultValue={moment(contract?.startAt, 'DD-MM-YYYY').toDate()}
            />
            <FormMaskedInput
              disabled
              name='price'
              label='Giá phòng'
              defaultValue={contract.price}
              unit={'Vnđ'}
            />
            <Chip style={styles.chip} icon='timeline-clock-outline'>
              Dịch vụ
            </Chip>
            {contract.listService.map(s => {
              return (
                <List.Item
                  left={props => <List.Icon {...props} icon={s.icon} />}
                  key={s.serviceId}
                  title={s.name}
                  description={`${vndFormatter(s.price)}`}
                />
              );
            })}
            <Chip style={styles.chip} icon='account-group-outline'>
              Người thuê
            </Chip>
            {contract.listRenter.map(r => {
              return (
                <List.Item
                  left={props => {
                    return <List.Icon {...props} icon='account' />;
                  }}
                  key={r.renterId}
                  title={r.name}
                  description={r.phone}
                />
              );
            })}
            <Button mode='contained'>Chỉnh sửa hợp đồng</Button>
            <Button color='tomato' onPress={handleDelete}>
              Xóa hợp đồng
            </Button>
          </Form>
        )}
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
  chip: {
    marginBottom: 12,
  },
});

export default React.memo(ContractDetailsScreen);
