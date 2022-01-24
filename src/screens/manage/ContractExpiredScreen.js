import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ContractContext from '../../context/ContractContext';
import { ListItemSwipeable } from '../../components/common';
import { useDispatch } from 'react-redux';
import { terminateContract } from '../../store/slices/contractSlide';

function ContractExpiredScreen(props) {
  const { contracts, error, loading, onRefresh } = React.useContext(ContractContext);
  const dispatch = useDispatch();
  const handleTerminate = contract => () => {
    dispatch(terminateContract(contract.contractId))
      .unwrap()
      .then(() => alert('Terminated'))
      .catch(() => alert('Error'));
  };
  return (
    <View style={styles.container}>
      {contracts && (
        <FlatList
          onRefresh={onRefresh}
          refreshing={loading}
          data={contracts.expired.data}
          keyExtractor={i => i.contractId}
          renderItem={({ item }) => {
            return (
              <ListItemSwipeable
                title={`Hợp đồng phòng ${item.roomName}`}
                description={item.nameBuilding}
                icon='handshake'
                rightIcon='stop-circle-outline'
                rightBC='coral'
                onRightActionPress={handleTerminate(item)}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ContractExpiredScreen);
