import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { SERVICE_CLOSING_EDIT_SCREEN } from '../../constants/navigation';
import ServiceClosingContext from '../../context/ServiceClosingContext';

function ActiveServiceRoomsScreen(props) {
  const { rooms, loading, error, onRefresh } = React.useContext(ServiceClosingContext);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    if (!rooms) setData([]);
    else {
      const d = mapToSectionListData(rooms.notExitMonth);
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

  const handleItemPress = room => () => navigation.navigate(SERVICE_CLOSING_EDIT_SCREEN, room);

  return (
    <View style={styles.container}>
      <SectionList
        refreshing={loading}
        onRefresh={onRefresh}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <List.Item
              title={item.name}
              left={props => <List.Icon {...props} icon='handshake' />}
              onPress={handleItemPress(item)}
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

export default React.memo(ActiveServiceRoomsScreen);
