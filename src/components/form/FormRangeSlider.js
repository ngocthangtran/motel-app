import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import CustomSliderLabel from '../common/CustomSliderLabel';
import FormFieldWrapper from './FormFieldWrapper';

function FormRangeSlider({
  name,
  label,
  min = 0,
  max = 100,
  defaultValue = [0, 100],
  useLessThan = false,
  useGreaterThan = false,
  unit = '',
  ...rest
}) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [enableLabel, setEnableLabel] = useState(false);
  const { colors } = useTheme();
  var v = getValues(name);

  const handleValuesChangeStart = () => setEnableLabel(true);
  const handleValuesChangeFinish = v => {
    setEnableLabel(false);
    setValue(name, { min: v[0], max: v[1] });
  };

  const handleRenderRightLabel = () => {
    if (!v) v = defaultValue;
    return (
      <Text style={styles.title}>{`${useLessThan && v.min == min ? '-' : ''}${v.min} ${unit} - ${
        v.max
      }${useGreaterThan && v.max == max ? '+' : ''} ${unit}`}</Text>
    );
  };

  return (
    <FormFieldWrapper
      label={label}
      error={errors[name]?.message}
      renderRightLabel={handleRenderRightLabel}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.container}>
            <MultiSlider
              min={min}
              max={max}
              sliderLength={Dimensions.get('screen').width - 48}
              enableLabel={enableLabel}
              values={[value.min, value.max]}
              selectedStyle={{
                backgroundColor: colors.backdrop,
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
              markerStyle={[styles.marker, { backgroundColor: colors.primary }]}
              onValuesChangeStart={handleValuesChangeStart}
              customLabel={labelsInfo => <CustomSliderLabel labelsInfo={labelsInfo} />}
              onValuesChangeFinish={handleValuesChangeFinish}
            />
          </View>
        )}
        defaultValue={defaultValue}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  marker: {
    width: 24,
    height: 14,
    margin: 20,
  },
});

export default React.memo(FormRangeSlider);
