import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
// import { TextInput } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';
import * as Yup from 'yup';

function FormTextInput({
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
    getValues,
    formState: { errors },
  } = useFormContext();
  const { colors } = useTheme();

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message} required={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...rest}
            editable={!disabled}
            value={value}
            mode='outlined'
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={colors.placeholder}
            style={[styles.textInput, { color: colors.text }]}
          />
        )}
      />
    </FormFieldWrapper>
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

export default React.memo(FormTextInput);
