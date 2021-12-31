import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppBar } from '../../components';
import { FAB } from '../../components/common';
import { CONTRACT } from '../../constants/navigation';

function TenantScreen(props) {
  const navigation = useNavigation();
  const { params: room } = useRoute();
  const handleCreatePress = () => navigation.navigate(CONTRACT, room.roomId);
  const handleFabPress = () => {
    if (!room.contractCount) {
      Alert.alert('Phòng chưa có hợp đồng', 'Tạo hợp đồng ngay', [
        { text: 'Hủy' },
        { text: 'Tạo', onPress: handleCreatePress },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' />
      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(TenantScreen);
