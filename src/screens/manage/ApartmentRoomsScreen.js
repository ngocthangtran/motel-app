import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FAB } from '../../components/common';
import { ROOM_EDIT_SCREEN } from '../../constants/navigation';
import ApartmentContext from '../../context/ApartmentContext';

function ApartmentRoomsScreen(props) {
  const navigation = useNavigation();
  const apartment = useContext(ApartmentContext);
  const handleFabPress = () => navigation.navigate(ROOM_EDIT_SCREEN, apartment);
  return (
    <View style={styles.container}>
      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ApartmentRoomsScreen);
