import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LOGIN } from '../constants/navigation';

function RequiredLoginWrapper({ children }) {
  const { user } = useSelector(state => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderLoginRequired = () => {
    return (
      <Surface style={styles.content}>
        <MaterialCommunityIcons
          name='account-alert-outline'
          size={60}
          color={colors.accent}
        />
        <Text>user: {JSON.stringify(user)}</Text>
        <Text>Bạn cần đăng nhập để sử dụng tính năng này </Text>
        <Button onPress={() => navigation.navigate(LOGIN)}>Đăng nhập</Button>
      </Surface>
    );
  };

  return (
    <Surface style={styles.container}>
      {user != null ? children : renderLoginRequired()}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RequiredLoginWrapper;
