import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ContractContext from '../../context/ContractContext';
import { List } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeableAction } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { CONTRACT_DETAILS_SCREEN } from '../../constants/navigation';
import { deleteContractAction, terminateContract } from '../../store/slices/contractSlide';
import { useDispatch } from 'react-redux';

function ContractActiveScreen(props) {
  const { contracts, error, loading, onRefresh } = React.useContext(ContractContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleTerminateContract = contract => () => {
    Alert.alert('Kết thúc hợp đồng', 'Bạn có chắc chắn muốn kết thúc hợp đồng?', [
      { text: 'Không' },
      {
        text: 'Kết thúc',
        onPress: () => {
          dispatch(terminateContract(contract.contractId)).unwrap()
            .then(() => {
              Alert.alert("Thông báo", "Hợp đồng đã được kết thúc");
            })
            .catch(() => Alert.alert("Lỗi", "Không thể kết thúc hợp đồng"))
        }
      },
    ]);
  };

  const handleDeleteContract = contract => () => {
    Alert.alert('Xóa hợp đồng', 'Bạn có chắc chắn muốn xóa hợp đồng?', [
      { text: 'Không' },
      {
        text: 'Xóa',
        onPress: () => {
          dispatch(deleteContractAction(contract.contractId))
            .unwrap()
            .then(() => {
              Alert.alert("Thông báo", "Hợp đồng đã xóa thành công");
            })
            .catch(() => {
              Alert.alert("Lỗi", "Có lỗi xảy ra xin thử lại sau");
            });
        }
      },
    ]);
  };

  const handleContractPress = c => () => navigation.navigate(CONTRACT_DETAILS_SCREEN, c.contractId);

  return (
    <View style={styles.container}>
      {contracts && (
        <FlatList
          onRefresh={onRefresh}
          refreshing={loading}
          data={contracts.takeEffect.data}
          keyExtractor={i => i.contractId}
          renderItem={({ item }) => {
            return (
              <Swipeable
                renderLeftActions={() => {
                  return (
                    <SwipeableAction
                      icon='stop-circle-outline'
                      background='coral'
                      onPress={handleTerminateContract(item)}
                    />
                  );
                }}
                renderRightActions={() => {
                  return (
                    <SwipeableAction
                      icon='trash-can-outline'
                      background='tomato'
                      onPress={handleDeleteContract(item)}
                    />
                  );
                }}
              >
                <List.Item
                  onPress={handleContractPress(item)}
                  title={`Hợp đồng phòng ${item.roomName}`}
                  description={item.nameBuilding}
                  left={props => <List.Icon {...props} icon='handshake' />}
                />
              </Swipeable>
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

export default React.memo(ContractActiveScreen);
