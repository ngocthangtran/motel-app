import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Picker } from '../common';
import FormFieldWrapper from './FormFieldWrapper';

function FormPicker({
  name,
  label,
  items,
  required,
  placeholder,
  PickerItemComponent,
  numColumns,
  defaultValue,
}) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleItemSelect = item => {
    setValue(name, item, { shouldDirty: true });
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message} required={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value } }) => (
          <Picker
            items={items}
            onItemSelect={handleItemSelect}
            placeholder={placeholder}
            selectedItem={value}
            PickerItemComponent={PickerItemComponent}
            numColumns={numColumns}
          />
        )}
      />
    </FormFieldWrapper>
  );
}

export default React.memo(FormPicker);
