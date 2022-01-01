import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { AfterInteractions } from '../../components/common';
import { ROOM_TYPES } from '../../constants/form';
import {
  Form,
  FormImagePicker,
  FormMaskedInput,
  FormPicker,
  FormSubmitButton,
  FormTextInput,
  FormUtilsPicker,
} from '../../components/form';
import { getApartmentServices } from '../../store/slices/serviceSlice';
import * as Yup from 'yup';
import roomCreateMapper from '../../utils/mappers/roomCreateMapper';
import { createRoom, reloadRoom } from '../../store/slices/roomSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  area: Yup.string().min(1).required(),
  deposit: Yup.string().min(0),
  price: Yup.string().min(1).required(),
});

function RoomEditScreen(props) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { apServices } = useSelector(state => state.service);
  const { loading, error } = useSelector(state => state.room);

  useEffect(() => {
    dispatch(getApartmentServices({ apartmentId: route.params.buildingId }));
  }, []);

  const handleSubmit = async values => {
    const room = roomCreateMapper(values, route.params.buildingId);
    dispatch(createRoom({ room })).unwrap()
      .then((res) => {
        const loadRoomAction = reloadRoom({
          type: 'add',
          data: {
            roomId: res.roomId,
            name: res.name,
            contractCount: 0,
            renterCount: 0,
            price: "Chưa định giá",
            status: "Chưa thuê"
          }
        })
        dispatch(loadRoomAction)
        alert("Tạo thành công");
      })
      .catch(() => {
        alert('Cannot create room');
      });
  };
  return (
    <View style={styles.container}>
      <AppBar title={'Thêm phòng'} />
      <Surface style={styles.contentContainer}>
        <AfterInteractions>
          <Form validationSchema={validationSchema}>
            {/* <Text>{JSON.stringify(apServices)}</Text> */}
            <FormTextInput required name='name' label='Tên phòng' placeholder='Phòng 1' />
            <FormPicker label='Loại' name='roomType' items={ROOM_TYPES} placeholder='Chọn loại' />
            <FormMaskedInput required name='area' label='Diện tích' placeholder='20' unit='m²' />
            <FormMaskedInput name='deposit' label='Tiền cọc' placeholder='20' unit='Vnđ' />
            <FormMaskedInput
              required
              name='price'
              label='Giá thuê phòng'
              placeholder='20'
              unit='Vnđ'
            />
            <FormUtilsPicker name='utils' items={apServices} label='Dịch vụ phòng' />
            {/* <FormImagePicker name='images' label='Ảnh phòng' /> */}
            <FormSubmitButton title={'Tạo phòng'} onSubmit={handleSubmit} loading={loading} />
          </Form>
        </AfterInteractions>
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
    paddingTop: 12,
    paddingHorizontal: 12,
  },
});

export default React.memo(RoomEditScreen);
