import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';

function FormHiddenField({
  name,
  label,
  placeholder,
  required,
  numeric = false,
  defaultValue,
  disabled = false,
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { colors } = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value } }) => null}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
});

export default React.memo(FormHiddenField);
