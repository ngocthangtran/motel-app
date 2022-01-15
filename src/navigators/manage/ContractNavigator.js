import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  CONTRACT_ACTIVE_SCREEN,
  CONTRACT_EXPIRED_SCREEN,
  CONTRACT_TERMINATED_SCREEN,
} from '../../constants/navigation';
import ContractActiveScreen from '../../screens/manage/ContractActiveScreen';
import ContractTerminatedScreen from '../../screens/manage/ContractTerminatedScreen';
import ContractExpiredScreen from '../../screens/manage/ContractExpiredScreen';
import { AppBar } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractsAction } from '../../store/slices/contractSlide';
import ContractContext from '../../context/ContractContext';

const Tab = createMaterialTopTabNavigator();

const ContractNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contractState = useSelector(state => state.contract);

  useEffect(() => {
    dispatch(fetchContractsAction());
  }, []);

  const handleBack = () => navigation.goBack();
  const onRefresh = () => dispatch(fetchContractsAction());
  return (
    <>
      <AppBar title='Danh sách hợp đồng' onBack={handleBack} />
      <ContractContext.Provider value={{ ...contractState, onRefresh }}>
        <Tab.Navigator>
          <Tab.Screen
            name={CONTRACT_ACTIVE_SCREEN}
            component={ContractActiveScreen}
            options={{ title: 'Có hiệu lực' }}
          />
          <Tab.Screen
            name={CONTRACT_TERMINATED_SCREEN}
            component={ContractTerminatedScreen}
            options={{ title: 'Đã kết thúc' }}
          />
          <Tab.Screen
            name={CONTRACT_EXPIRED_SCREEN}
            component={ContractExpiredScreen}
            options={{ title: 'Quá hạn' }}
          />
        </Tab.Navigator>
      </ContractContext.Provider>
    </>
  );
};

export default React.memo(ContractNavigator);
