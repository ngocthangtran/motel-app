import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { AppBar } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractsAction } from '../../store/slices/contractSlide';
import { List, Surface } from 'react-native-paper';
import { FAB } from '../../components/common';
import { CONTRACT_EDIT_SCREEN } from '../../constants/navigation';

function ContractsScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { contracts } = useSelector(state => state.contract);

  useEffect(() => {
    dispatch(fetchContractsAction());
  }, []);

  const handleBack = () => navigation.goBack();
  const handleFabPress = () => navigation.navigate(CONTRACT_EDIT_SCREEN);
  return (
    <View style={styles.container}>
      <AppBar title='Tất cả hợp đồng' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        {console.log(contracts)}
        {contracts && (
          <FlatList
            data={contracts.takeEffect.data}
            keyExtractor={c => c.contractId}
            renderItem={({ item }) => {
              return (
                <List.Item
                  title={`Hợp đồng phòng ${item.roomName}`}
                  left={props => <List.Icon {...props} icon='handshake' />}
                />
              );
            }}
            // ItemSeparatorComponent={Separa}
          />
        )}
      </Surface>
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
  },
});

export default React.memo(ContractsScreen);
