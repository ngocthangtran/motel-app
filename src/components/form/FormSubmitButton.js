import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function FormSubmitButton({ title = '', loading = false, onSubmit }) {
  const {
    handleSubmit,
    formState: { isSubmitting, isValidating },
  } = useFormContext();

  return (
    <Button
      style={styles.container}
      mode='contained'
      onPress={handleSubmit(onSubmit)}
      loading={isSubmitting || isValidating || loading}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    color: '#fff',
  },
});

export default React.memo(FormSubmitButton);
