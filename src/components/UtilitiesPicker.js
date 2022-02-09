import React from 'react';
import { View, StyleSheet } from 'react-native';
import UtilityItem from './UtilityItem';

function UtilitiesPicker({ items, selectedItems, disable = false, onSelectItem, onRemoveItem }) {
  const handlePress = item => () => {
    selectedItems.find(i => i.utilityId === item.utilityId)
      ? onRemoveItem(item)
      : onSelectItem(item);
  };
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        return (
          <UtilityItem
            active={selectedItems.find(i => i.utilityId === item.utilityId)}
            key={item + index}
            name={item.icon}
            label={item.name}
            onPress={disable ? null : handlePress(item)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default React.memo(UtilitiesPicker);
