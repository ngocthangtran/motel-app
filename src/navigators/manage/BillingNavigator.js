import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { PAID_BILLS_SCREEN, UNPAID_BILL_SCREEN } from '../../constants/navigation';
import BillingContext from '../../context/BillingContext';
import { PaidBillsScreen, UnpaidBillsScreen } from '../../screens/manage';
import { getBills } from '../../store/slices/billingSlice';

const Tab = createMaterialTopTabNavigator();

const BillingNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const billingState = useSelector(state => state.billing);

  useEffect(() => {
    refreshBills();
  }, []);

  const refreshBills = () => {
    const crrDate = new Date();
    dispatch(getBills({ month: crrDate.getMonth() + 1, year: crrDate.getFullYear() }));
  };

  const handleBack = () => navigation.goBack();
  return (
    <BillingContext.Provider value={{ ...billingState, refreshBills }}>
      <AppBar title='Hóa đơn' onBack={handleBack} />
      <Tab.Navigator>
        <Tab.Screen
          name={UNPAID_BILL_SCREEN}
          component={UnpaidBillsScreen}
          options={{ title: 'Chưa thanh toán' }}
        />
        <Tab.Screen
          name={PAID_BILLS_SCREEN}
          component={PaidBillsScreen}
          options={{ title: 'Đã thanh toán' }}
        />
      </Tab.Navigator>
    </BillingContext.Provider>
  );
};

export default React.memo(BillingNavigator);
