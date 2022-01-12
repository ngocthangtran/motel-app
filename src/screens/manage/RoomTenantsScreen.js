import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Surface } from 'react-native-paper';
import { AppBar } from '../../components';
import { FAB } from '../../components/common';
import { CONTRACT, CONTRACT_EDIT_SCREEN } from '../../constants/navigation';

function RoomTenantsScreen(props) {
  const { room, apartmentId } = useRoute().params;
  const navigation = useNavigation();

  const handleCreateContract = () =>
    navigation.navigate(CONTRACT_EDIT_SCREEN, { room, apartmentId });
  const handleFabPress = () => {
    if (room.contractCount === 0) {
      Alert.alert('Chưa có hợp đòng', 'Phòng chưa có hợp đồng, tạo hợp đồng ngay?', [
        { text: 'Hủy' },
        { text: 'Tạo hợp đồng', onPress: handleCreateContract },
      ]);
    }
  };
  const handleBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' onBack={handleBack} />
      <Text>{JSON.stringify(room)}</Text>
      <Text>{JSON.stringify(apartmentId)}</Text>
      <Surface style={styles.contentContainer}></Surface>
      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(RoomTenantsScreen);
