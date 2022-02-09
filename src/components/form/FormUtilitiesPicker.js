import React from 'react';
import UtilitiesPicker from '../UtilitiesPicker';
import { UTILITIES } from '../../constants/form';
import { Controller, useFormContext } from 'react-hook-form';
import FormFieldWrapper from './FormFieldWrapper';

function FormUtilitiesPicker({ name, label, defaultValue = [] }) {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const handleSelect = i => {
    const value = getValues(name);
    setValue(name, [...value, i]);
  };

  const handleRemove = i => {
    const value = getValues(name);
    const filtered = value.filter(u => u.utilityId !== i.utilityId);
    setValue(name, filtered);
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <UtilitiesPicker
            items={UTILITIES}
            selectedItems={value}
            onSelectItem={handleSelect}
            onRemoveItem={handleRemove}
          />
        )}
        defaultValue={defaultValue}
      />
    </FormFieldWrapper>
  );
}
export default React.memo(FormUtilitiesPicker);
