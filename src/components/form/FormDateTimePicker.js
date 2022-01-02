import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';
import DateTimePicker from '@react-native-community/datetimepicker';
import useDisclosure from '../../hooks/useDisclosure';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function FormDateTimePicker({
  name,
  label,
  placeholder,
  required = false,
  defaultValue,
  mode = 'time',
  ...rest
}) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [isOpen, onOpen, onClose] = useDisclosure();
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());
  const handleChange = (event, selectedDate) => {
    if (event.type === 'set') setValue(name, selectedDate);
    onClose();
  };
  const getPlaceholder = value => {
    if (mode === 'time') return value && value.getHours() + ' : ' + value.getMinutes();
    else return value && value.getDate() + '/' + value.getMonth() + 1 + '/' + value.getFullYear();
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message} required={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity onPress={onOpen} style={styles.touchable}>
              <TextInput
                textAlign='center'
                editable={false}
                value={getPlaceholder(value)}
                placeholder={mode === 'time' ? '-- : --' : '__ /__ /__'}
                placeholderTextColor={colors.placeholder}
                style={[styles.textInput, { color: colors.text }]}
              />
              <MaterialCommunityIcons name='chevron-down' />
            </TouchableOpacity>
            {isOpen && (
              <DateTimePicker
                value={value || new Date()}
                mode={mode === 'time' ? 'time' : 'date'}
                is24Hour={false}
                display='default'
                onChange={handleChange}
              />
            )}
          </>
        )}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  getLocationButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  textInput: {
    // backgroundColor: 'transparent',
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: '#ddd',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(FormDateTimePicker);
