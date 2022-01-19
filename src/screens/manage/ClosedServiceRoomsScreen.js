import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import ServiceClosingContext from '../../context/ServiceClosingContext';

function ClosedServiceRoomsScreen(props) {
  const { rooms, loading, error } = React.useContext(ServiceClosingContext);
  const [data, setData] = useState([]);
  const { colors } = useTheme();

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
  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <List.Item
              title={item.name}
              description={item.ward}
              left={props => <List.Icon {...props} icon='handshake' />}

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
