import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Surface } from 'react-native-paper';
import { FAB, ListItemSwipeable } from '../../components/common';
import { BILL_EDIT_SCREEN } from '../../constants/navigation';
import BillingContext from '../../context/BillingContext';
import { vndFormatter } from '../../utils/common';

function PaidBillsScreen(props) {
  const { loading, error, bills, refreshBills } = React.useContext(BillingContext);
  const navigation = useNavigation();

  const handleCreateBill = () => navigation.navigate(BILL_EDIT_SCREEN);
  const handleDelete = item => () => {};
  return (
    <Surface style={styles.container}>
      {bills && (
        <FlatList
          refreshing={loading}
          onRefresh={refreshBills}
          data={bills.paid}
          keyExtractor={item => item.billId}
          renderItem={({ item }) => {
            return (
              <ListItemSwipeable
                title={item.roomName + ' - ' + item.buildingName}
                description={vndFormatter(item.sumPrice)}
                leftBC='tomato'
                onLeftActionPress={handleDelete(item)}
              />
            );
          }}
        />
      )}
      <FAB onPress={handleCreateBill} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(PaidBillsScreen);
