import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppBar } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Surface, useTheme } from 'react-native-paper';
import {
  closingService,
  getRoomServices,
  getServiceClosingRooms,
} from '../../store/slices/serviceClosingSlice';
import {
  Form,
  FormDateTimePicker,
  FormMaskedInput,
  FormRow,
  FormSubmitButton,
} from '../../components/form';
import { Gap } from '../../components/common';
import { serviceClosingMapper } from '../../utils/mappers';

function ServiceClosingEditScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const room = useRoute().params;
  const { colors } = useTheme();

  useEffect(() => {
    const curDate = new Date();
    const month = curDate.getMonth() + 1;
    const year = curDate.getFullYear();
    dispatch(getRoomServices({ roomId: room.roomId, month, year }));
    return () => {
      dispatch(getServiceClosingRooms());
    };
  }, []);

  const roomSV = useSelector(state => state.serviceClosing.roomServices);
  const handleBack = () => navigation.goBack();
  const handleSubmit = values => {
    const data = serviceClosingMapper(values, roomSV.contractId, roomSV.service);
    dispatch(closingService(data))
      .unwrap()
      .then(() => {
        alert('Chốt dịch vụ thành công');
      })
      .catch(() => {
        alert('Có lỗi xảy ra, vui lòng thử lại');
      });
  };

  return (
    <View style={styles.container}>
      <AppBar title='Chốt dịch vụ phòng' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        <Form>
          <Chip style={{ marginBottom: 12 }} icon='calendar' textStyle={{ fontWeight: 'bold' }}>
            {'Thông tin'}
          </Chip>
          <FormDateTimePicker
            name='date'
            label='Ngày chốt dịch vụ'
            defaultValue={new Date()}
            mode='date'
          />
          {roomSV?.service.map(sv => {
            return (
              <View key={sv.serviceId}>
                <Chip
                  style={{ marginBottom: 12 }}
                  icon={sv.icon}
                  textStyle={{ fontWeight: 'bold' }}
                >
                  {sv.name}
                </Chip>
                <FormRow>
                  <FormMaskedInput
                    name={sv.serviceId + '_lastValue'}
                    defaultValue={sv.lastValue}
                    label={'Chỉ số cũ'}
                    unit={sv.unit}
                  />
                  <Gap width={20} />
                  <FormMaskedInput
                    name={sv.serviceId + '_curValue'}
                    label={'Chỉ số mới'}
                    unit={sv.unit}
                  />
                </FormRow>
              </View>
            );
          })}
          <FormSubmitButton title='Chốt dịch vụ' onSubmit={handleSubmit} />
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

export default React.memo(ServiceClosingEditScreen);
