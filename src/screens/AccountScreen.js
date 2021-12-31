import React from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AfterInteractions, SafeAreaContainer } from '../components/common';
import {
  Appbar,
  Avatar,
  Caption,
  Divider,
  List,
  Subheading,
  Surface,
  Switch,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../store/slices/themeSlice';
import SelectLanguageDialog from '../components/dialogs/SelectLanguageDialog';
import useDisclosure from '../hooks/useDisclosure';
import YesNoDialog from '../components/dialogs/YesNoDialog';
import t from '../utils/i18n';
import { logout } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/core';
import { LOGIN, POSTED } from '../constants/navigation';
import { setRole } from '../store/slices/roleSlice';
// import { ActivityIndicator } from 'react-native-paper';

function AccountScreen(props) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.role);
  const navigation = useNavigation();
  const [langDialogVisible, onLangDialogOpen, onLangDialogClose] = useDisclosure();
  const [logoutDialogVisible, onLogoutDialogOpen, onLogoutDialogClose] = useDisclosure();

  const handleChangeTheme = () => dispatch(changeTheme(!theme));
  const handleLogout = () => dispatch(logout());
  const handlePostedPress = () => navigation.navigate(POSTED);
  const handleManagePress = () => {
    if (!user)
      Alert.alert('Yêu cầu đăng nhập', 'Bạn cần đăng nhập để sử dụng tính năng này', [
        { text: 'Hủy' },
        { text: 'Đăng nhập', onPress: () => navigation.navigate(LOGIN) },
      ]);
    else dispatch(setRole(role === 'MANAGER' ? 'FINDER' : 'MANAGER'));
  };

  return (
    <Surface style={styles.container}>
      {console.log(token)}
      <Appbar.Header>
        <Appbar.Content title='Account' />
      </Appbar.Header>
      <SafeAreaContainer>
        <AfterInteractions PlaceHolderComponent={<ActivityIndicator animating color='#f0f' />}>
          <Surface style={styles.useInfoContainer}>
            {user ? (
              <Avatar.Image
                source={{
                  uri: user.avatar,
                }}
              />
            ) : (
              <Avatar.Text label='?' />
            )}
            <Surface style={styles.userDetails}>
              <Subheading>{user?.name || 'Chưa đăng nhập'}</Subheading>
              <Caption numberOfLines={2}>
                {user?.email || `Vui lòng đăng nhập để sử dụng đầy đủ các tính năng`}
              </Caption>
            </Surface>
          </Surface>
          <Divider />
          <List.Item
            title='Chế độ tối'
            description='Bảo vệ mắt, lọc ánh sáng xanh'
            left={props => <List.Icon {...props} icon='weather-sunny' />}
            right={() => <Switch value={theme} onValueChange={handleChangeTheme} />}
          />
          <List.Item
            title='Ngôn ngữ'
            description='Ngôn ngữ hiển thị'
            left={props => <List.Icon {...props} icon='translate' />}
            right={props => <List.Icon {...props} icon='chevron-right' />}
            onPress={onLangDialogOpen}
          />
          <Divider />
          <List.Item
            title='Bài đã đăng'
            description='Quản lý bài và trạng thái bài đăng'
            left={props => <List.Icon {...props} icon='timeline-text-outline' />}
            right={props => <List.Icon {...props} icon='chevron-right' />}
            onPress={handlePostedPress}
          />
          <List.Item
            title={role === 'MANAGER' ? 'Tìm phòng trọ' : 'Quản lý trọ'}
            description={
              role === 'MANAGER' ? 'Tìm trọ dễ dàng, nhanh chóng' : 'Quản lý trọ, nhà cho thuê'
            }
            left={props => <List.Icon {...props} icon='warehouse' />}
            right={props => <List.Icon {...props} icon='chevron-right' />}
            onPress={handleManagePress}
          />
          <Divider />
          <List.Item
            title='Đăng xuất'
            description='Thoát tài khoản'
            left={props => <List.Icon {...props} icon='logout' />}
            right={props => <List.Icon {...props} icon='chevron-right' />}
            onPress={onLogoutDialogOpen}
          />
          <SelectLanguageDialog visible={langDialogVisible} onDismiss={onLangDialogClose} />
          <YesNoDialog
            title={t('account_alert_logout')}
            message={t('account_alert_logout_body')}
            visible={logoutDialogVisible}
            onDismiss={onLogoutDialogClose}
            onPositive={handleLogout}
          />
        </AfterInteractions>
      </SafeAreaContainer>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  useInfoContainer: {
    paddingHorizontal: 6,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 16,
    flexShrink: 1,
  },
});

export default React.memo(AccountScreen);
