import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import SwipeableAction from './SwipeableAction';

function ListItemSwipeable({
  title = '',
  description = '',
  icon = 'information-outline',
  onPress,
  leftIcon,
  rightIcon,
  onLeftActionPress,
  onRightActionPress,
  leftBC,
  rightBC,
}) {
  return (
    <Swipeable
      renderLeftActions={() =>
        leftIcon ? (
          <SwipeableAction icon={leftIcon} onPress={onLeftActionPress} background={leftBC} />
        ) : null
      }
      renderRightActions={() =>
        rightIcon ? (
          <SwipeableAction icon={rightIcon} onPress={onRightActionPress} background={rightBC} />
        ) : null
      }
    >
      <List.Item
        title={title}
        description={description}
        onPress={onPress}
        left={props => <List.Icon {...props} icon={icon} />}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ListItemSwipeable);
