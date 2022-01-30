import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Divider, IconButton, List, Surface, useTheme } from 'react-native-paper';
import useDisclosure from '../../hooks/useDisclosure';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Picker({
  items,
  placeholder,
  selectedItem,
  PickerItemComponent,
  numColumns = 1,
  onItemSelect,
}) {
  const ref = React.createRef(null);
  const { colors } = useTheme();
  const [isVisible, onOpen, onClose] = useDisclosure();

  const handleItemPress = item => () => {
    onClose();
    onItemSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onOpen}
        disabled={items.length === 0 ? true : false}
      >
        <TextInput
          // mode='outlined'
          editable={false}
          placeholder={placeholder}
          value={selectedItem ? selectedItem.name || selectedItem : ''}
          placeholderTextColor={colors.placeholder}
          // right={<TextInput.Icon name='chevron-down' disabled />}
          style={[styles.textInput, { color: colors.text }]}
        />
        <MaterialCommunityIcons name='chevron-down' />
      </TouchableOpacity>
      <Modal transparent visible={isVisible} animationType='fade'>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)' }} onPress={onClose}>
          <Surface style={styles.modalContent}>
            <IconButton icon='chevron-down' style={{ width: '100%' }} />
            <Divider />
            <FlatList
              style={{ flex: 1 }}
              data={items}
              keyExtractor={item => item.name || item}
              numColumns={numColumns}
              renderItem={({ item }) =>
                PickerItemComponent ? (
                  <PickerItemComponent
                    item={item}
                    // selected={selectedItem.includes(item)}
                    onPress={handleItemPress(item)}
                  />
                ) : (
                  <List.Item title={item.name || item} onPress={handleItemPress(item)} />
                )
              }
            />
          </Surface>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    // backgroundColor: 'transparent',
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: '#ddd',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    width: '100%',
    height: '40%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});

export default React.memo(Picker);
