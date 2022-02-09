import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text, ToggleButton } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';

function FormToggleField({ items, valueField, titleField, name, label, defaultValue }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleValueChange = v => {
    if (v !== null) setValue(name, v);
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <ToggleButton.Row onValueChange={handleValueChange} value={value}>
            {items.map((i, index) => (
              <ToggleButton
                style={styles.toggleButton}
                key={i + index}
                value={valueField ? i[valueField] : i}
                icon={() => <Text style={styles.text}>{titleField ? i[titleField] : i}</Text>}
              />
            ))}
          </ToggleButton.Row>
        )}
        defaultValue={defaultValue || (valueField ? items[0][valueField] : items[0])}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    flex: 1,
    height: 50,
  },
  text: {
    textAlign: 'center',
  },
});

export default React.memo(FormToggleField);
