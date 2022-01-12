import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '../common';
import FormFieldWrapper from './FormFieldWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, IconButton, Surface, useTheme } from 'react-native-paper';
import useDisclosure from '../../hooks/useDisclosure';

function FormMultiSelect({
  name,
  label,
  items,
  required,
  placeholder,
  PickerItemComponent,
  numColumns,
  defaultValue,
}) {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isVisible, onOpen, onClose] = useDisclosure();
  const { colors } = useTheme();

  const handleAdd = item => () => {
    const values = getValues(name);
    setValue(name, [...values, item]);
    onClose();
    // scrollRef.current.scrollToEnd();
  };
  const handleRemove = item => () => {
    const filtered = getValues(name).filter(i => JSON.stringify(i) !== JSON.stringify(item));
    setValue(name, filtered);
    onClose();
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message} required={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value } }) => (
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
                value={value.reduce((a, b) => {
                  return a === '' ? b.name || '' : a + ', ' + b.name;
                }, '')}
                placeholderTextColor={colors.placeholder}
                // right={<TextInput.Icon name='chevron-down' disabled />}
                style={[styles.textInput, { color: colors.text }]}
              />
              <MaterialCommunityIcons name='chevron-down' />
            </TouchableOpacity>
            <Modal transparent visible={isVisible} animationType='fade'>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)' }}
                onPress={onClose}
              >
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
                          selected={value.includes(item)}
                          onPress={value.includes(item) ? handleRemove(item) : handleAdd(item)}
                        />
                      ) : (
                        <List.Item
                          title={item.name || item}
                          onPress={value.includes(item) ? handleRemove(item) : handleAdd(item)}
                        />
                      )
                    }
                  />
                </Surface>
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  textInput: {
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

export default React.memo(FormMultiSelect);
