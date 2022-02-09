import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import ImageInputList from '../common/ImageInputList';
import FormFieldWrapper from './FormFieldWrapper';

function FormImagePicker({ name, label, placeholder, defaultValue = [] }) {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const handleAdd = url => {
    const values = getValues(name);
    setValue(name, [...values, url]);
  };
  const handleRemove = url => {
    const filtered = getValues(name).filter(image => url !== image);
    setValue(name, filtered);
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <ImageInputList imageUris={value} onAddImage={handleAdd} onRemoveImage={handleRemove} />
        )}
        defaultValue={defaultValue}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'red',
  },
});

export default React.memo(FormImagePicker);
