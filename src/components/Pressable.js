import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LongPress({
  onPress,
  longPressActions = [],
  children,
  actionsHorizontal = false,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleLongPress = () => setIsVisible(!isVisible);
  return (
    <Pressable {...props} onPress={onPress} onLongPress={handleLongPress}>
      <>
        {children}
        {isVisible && (
          <Surface style={styles.actionsContainer}>
            {longPressActions.map((action, i) => {
              return (
                <Pressable key={action + i} onPress={action.onPress} style={styles.action}>
                  <MaterialCommunityIcons
                    name={action.icon}
                    color={action.color || 'grey'}
                    size={20}
                  />
                </Pressable>
              );
            })}
          </Surface>
        )}
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'transparent',
  },
  action: {
    padding: 6,
  },
});

export default React.memo(LongPress);
