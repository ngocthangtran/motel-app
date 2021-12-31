import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

function CustomSliderLabel({ labelsInfo: info }) {
  const { colors } = useTheme();
  return (
    <>
      <View style={[styles.customLabelContainer, { left: info.oneMarkerLeftPosition - 20 }]}>
        <Text style={[styles.customLabel, { backgroundColor: colors.primary }]}>
          {info.oneMarkerValue}
        </Text>
      </View>
      <View style={[styles.customLabelContainer, { left: info.twoMarkerLeftPosition - 20 }]}>
        <Text style={[styles.customLabel, { backgroundColor: colors.primary }]}>
          {info.twoMarkerValue}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  customLabelContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    bottom: 40,
  },
  customLabel: {
    padding: 10,
    color: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});

export default React.memo(CustomSliderLabel);
