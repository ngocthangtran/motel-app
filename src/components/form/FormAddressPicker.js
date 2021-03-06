import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Picker } from '../common';
import FormFieldWrapper from './FormFieldWrapper';
import PROVINCES from '../../constants/provinces.js';
import DISTRICTS from '../../constants/districts.json';
import WARDS from '../../constants/wards.json';

function FormAddressPicker({ defaultWard }) {
  const [districts, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);

  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (!defaultWard) return;
    const ward = WARDS.find(w => {
      return w.wardId === defaultWard;
    });
    const district = DISTRICTS.find(w => {
      return w.districtId === ward.districtId;
    });
    const province = PROVINCES.find(w => {
      return w.provinceId === district.provinceId;
    });
    setValue('province', province);
    setValue('district', district);
    setValue('ward', ward);
  }, []);

  const handleProvinceSelect = async p => {
    setValue('province', p);
    setValue('district', null);
    setValue('ward', null);
    const filtered = DISTRICTS.filter(d => {
      return d.provinceId === p.provinceId;
    });
    setDistrict(filtered);
    setWards([]);
  };
  const handleDistrictSelect = async d => {
    setValue('district', d);
    setValue('ward', null);
    const filtered = WARDS.filter(w => {
      return w.districtId === d.districtId;
    });
    setWards(filtered);
  };
  const handleWardSelect = async w => setValue('ward', w);

  return (
    <Surface style={styles.container}>
      <FormFieldWrapper label='Tỉnh / Thành phố' error={errors['province']?.message}>
        <Controller
          name={'province'}
          control={control}
          render={({ field: { value } }) => (
            <Picker
              placeholder='...'
              items={PROVINCES}
              onItemSelect={handleProvinceSelect}
              selectedItem={value}
            />
          )}
          defaultValue={null}
        />
      </FormFieldWrapper>
      <FormFieldWrapper label='Quận / Huyện' error={errors['district']?.message}>
        <Controller
          name={'district'}
          control={control}
          render={({ field: { value } }) => (
            <Picker
              placeholder='...'
              items={districts}
              onItemSelect={handleDistrictSelect}
              selectedItem={value}
            />
          )}
          defaultValue={null}
        />
      </FormFieldWrapper>
      <FormFieldWrapper label='Phường / Xã' error={errors['ward']?.message}>
        <Controller
          name={'ward'}
          control={control}
          render={({ field: { value } }) => {
            return (
              <Picker
                placeholder='...'
                items={wards}
                onItemSelect={handleWardSelect}
                selectedItem={value}
              />
            )
          }}
          defaultValue={null}
        />
      </FormFieldWrapper>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(FormAddressPicker);
