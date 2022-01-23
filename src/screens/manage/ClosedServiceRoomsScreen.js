import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ListItemSwipeable } from '../../components/common';
import ServiceClosingContext from '../../context/ServiceClosingContext';
import { dateToApiDate } from '../../utils/common';
import { useDispatch } from 'react-redux';
import { deleteClosedService } from '../../store/slices/serviceClosingSlice';

function ClosedServiceRoomsScreen(props) {
  const { rooms, loading, error, onRefresh } = React.useContext(ServiceClosingContext);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rooms) setData([]);
    else {
      const d = mapToSectionListData(rooms.exitmonth);
      setData(d);
    }
  }, [rooms]);

  const mapToSectionListData = data => {
    if (!data) return [];
    return data.map(item => {
      return {
        title: item.name,
        data: item.room,
      };
    });
  };

  const handleDeleteCS = item => () => {
    const deleteBody = {
      date: dateToApiDate(new Date()),
      contractId: item.contractId,
    };
  
    dispatch(deleteClosedService(deleteBody))
      .unwrap()
      .then(() => {
        alert('Deleted')

      })
      .catch(() => alert('Error'));
  };
  console.log(data)
  return (
    <View style={styles.container}>
      <SectionList
        refreshing={loading}
        onRefresh={onRefresh}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <ListItemSwipeable
              title={item.name}
              description={item.ward}
              icon='handshake'
              rightIcon='trash-can-outline'
              rightBC='tomato'
              onRightActionPress={handleDeleteCS(item)}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(ClosedServiceRoomsScreen);
