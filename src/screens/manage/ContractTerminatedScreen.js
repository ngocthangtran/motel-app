import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ContractContext from '../../context/ContractContext';
import { List } from 'react-native-paper';

function ContractTerminatedScreen(props) {
  const { contracts, error, loading, onRefresh } = React.useContext(ContractContext);
  return (
    <View style={styles.container}>
      {contracts && (
        <FlatList
          onRefresh={onRefresh}
          refreshing={loading}
          data={contracts.terminateAContract.data}
          keyExtractor={i => i.contractId}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={`Hợp đồng phòng ${item.roomName}`}
                description={item.nameBuilding}
                left={props => <List.Icon {...props} icon='handshake' />}
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

export default React.memo(ContractTerminatedScreen);
