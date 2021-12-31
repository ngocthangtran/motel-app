import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, HelperText, useTheme } from 'react-native-paper';

function FormFieldWrapper({ label, error = '', required = false, renderRightLabel, children }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Caption style={styles.label}>
          {label}
          {required && <Caption style={styles.asterisk}> *</Caption>}
        </Caption>
        {renderRightLabel?.()}
      </View>
      <>{children}</>
      <HelperText type='error' visible={error} padding='none'>
        {error.trim()}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    // color: '#000',
    // fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    textTransform: 'capitalize',
    fontSize: 16,
    marginBottom: 12,
  },
  asterisk: {
    fontSize: 16,
    color: 'red',
  },
});

export default React.memo(FormFieldWrapper);
