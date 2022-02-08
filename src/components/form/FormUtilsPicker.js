import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, IconButton, Surface, List } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useDisclosure from '../../hooks/useDisclosure';
import { vndFormatter } from '../../utils/common';

function FormUtilsPicker({ name, label, items = [], defaultValue, onAdd }) {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (!defaultValue) return
    setValue(name, defaultValue)
  }, [defaultValue])

  const [isVisible, onOpen, onClose] = useDisclosure();
  const scrollRef = useRef();

  const handleAdd = item => () => {
    const values = getValues(name);
    const { serviceId, icon, name: sName, fee_base_ons_id, unit } = item;
    setValue(name, [...values, { serviceId, icon, unit, name: sName, fee_base_ons_id }]);
    onClose();
    scrollRef.current.scrollToEnd();
  };
  const handleRemove = item => () => {
    const filtered = getValues(name).filter(i => i.serviceId !== item.serviceId);
    setValue(name, filtered);
    onClose();
  };

  const renderUtilItem = ({ item }) => {
    const values = getValues(name);
    const index = values.findIndex(i => i.serviceId === item.serviceId);
    return (
      <List.Item
        onPress={index === -1 ? handleAdd(item) : handleRemove(item)}
        left={props => <List.Icon {...props} icon={item.icon || 'toolbox-outline'} />}
        right={props =>
          index !== -1 ? <List.Icon {...props} icon='check-circle-outline' /> : null
        }
        title={item.name}
        description={`${item.price == 0 ? 'Miễn phí' : vndFormatter(item.price) + ' / ' + item.unit
          }`}
      />
    );
  };

  const handleAddNew = () => {
    onClose();
    onAdd();
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <>
            <ScrollView style={styles.scroll} horizontal ref={scrollRef}>
              {value.map(u => {
                // console.log(u)
                return (
                  <TouchableOpacity style={styles.item} key={u.serviceId} onPress={handleRemove(u)}>
                    <MaterialCommunityIcons name={u.icon || 'toolbox-outline'} size={28} />
                    <MaterialCommunityIcons name='close' style={styles.closeIcon} />
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity style={styles.buttonAdd} onPress={onOpen}>
                <MaterialCommunityIcons name='plus' size={22} />
              </TouchableOpacity>
            </ScrollView>
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
                    keyExtractor={item => item.serviceId}
                    renderItem={renderUtilItem}
                  />
                  {onAdd && (
                    <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
                      <Text> + </Text>
                    </TouchableOpacity>
                  )}
                </Surface>
              </TouchableOpacity>
            </Modal>
          </>
        )}
        defaultValue={[]}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'red',
  },
  buttonAdd: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#ddd',
    borderRadius: 6,
  },
  scroll: {
    flexDirection: 'row',
  },
  item: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 12,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    width: '100%',
    // height: '40%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  closeIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    elevation: 1,
  },
  addButton: {
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 0.5,
    borderStyle: 'dotted',
  },
});

export default React.memo(FormUtilsPicker);
