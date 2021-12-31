import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calculator } from 'react-native-calculator';
import { useTheme } from 'react-native-paper';
import { AfterInteractions } from '../../components/common';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';

function UtilsScreen(props) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <AfterInteractions>
        <SafeAreaContainer>
          <Calculator
            style={{ flex: 1 }}
            borderColor='#ddd'
            calcButtonBackgroundColor={colors.primary}
          />
        </SafeAreaContainer>
      </AfterInteractions>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(UtilsScreen);
