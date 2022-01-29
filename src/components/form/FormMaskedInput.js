import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Surface, Text, TextInput } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';
import { useTheme } from 'react-native-paper';

function FormMaskedInput({
  name,
  label,
  unit,
  placeholder,
  required,
  defaultValue = 0,
  mask = '999 999',
  disabled = false,
}) {
  const {
    control,
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
          // <TextInput
          //   // dense
          //   value={value}
          //   mode='outlined'
          //   placeholder={placeholder}
          //   onChangeText={onChange}
          //   onBlur={onBlur}
          //   right={<TextInput.Affix text={unit || ''} />}
          //   style={styles.textInput}
          //   render={props => (
          <Surface style={styles.inputContainer}>
            <MaskedTextInput
              editable={!disabled}
              defaultValue={defaultValue + ''}
              value={value + ''}
              placeholder={placeholder}
              onChangeText={onChange}
              keyboardType='numeric'
              type='currency'
              mask='999'
              options={{
                groupSeparator: '.',
                precision: 0,
              }}
              placeholderTextColor={colors.placeholder}
              style={[styles.textInput, { color: colors.text }]}
            />
            {unit && <Text style={{ ...styles.unit, color: colors.primary }}>{unit}</Text>}
          </Surface>
          //   )}
          // />
        )}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    color: 'green',
    fontWeight: 'bold',
    // borderBottomColor: 'red',
  },
});

export default React.memo(FormMaskedInput);
