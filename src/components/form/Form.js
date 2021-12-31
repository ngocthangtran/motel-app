import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAvoidingWrapper } from '../common';

function Form({ children, validationSchema }) {
  const methods = useForm(
    validationSchema && {
      resolver: yupResolver(validationSchema),
    }
  );

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>{children}</View>
      </KeyboardAvoidingWrapper>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  // container: { flex: 1 },
});

export default React.memo(Form);
