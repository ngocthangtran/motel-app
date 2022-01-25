import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { FAB, ListItemSwipeable } from '../../components/common';
import { BILL_EDIT_SCREEN } from '../../constants/navigation';
import BillingContext from '../../context/BillingContext';

function UnpaidBillsScreen(props) {
  const { loading, error, bills } = React.useContext(BillingContext);
  const navigation = useNavigation();

  const handleCreateBill = () => navigation.navigate(BILL_EDIT_SCREEN);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(bills)}</Text>
      {bills && (
        <FlatList
          data={bills.unpaid}
          keyExtractor={item => item.billId}
          renderItem={({ item }) => {
            return <ListItemSwipeable title={item.roomName} description={item.buildingName} />;
          }}
        />
      )}
      <FAB onPress={handleCreateBill} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(UnpaidBillsScreen);
